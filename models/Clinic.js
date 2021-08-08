const db = require("../config/db");

class Clinic {
  static async getClinics({ clinicIDs } = {}) {
    let clinicQuery = "SELECT id, name FROM clinics;";

    if (clinicIDs) {
      if (clinicIDs.length > 0)
        clinicQuery = `SELECT id, name FROM clinics WHERE id IN (${clinicIDs
          .reduce((acc, curr) => acc + `${curr},`, "")
          .slice(0, -1)});`;
      else return [];
    }
    const [clinics] = await db.promise().query(clinicQuery);

    let [doctors] = await db.promise().query("SELECT id, name FROM doctors;");
    doctors = Object.fromEntries(
      doctors.map((doctor) => [doctor.id, { name: doctor.name }])
    );

    const [clinicDoctorRel] = await db
      .promise()
      .query("SELECT doctor, clinic FROM `clinic-doctor`;");
    const [services] = await db
      .promise()
      .query(
        "SELECT ds.doctor AS 'doctorID', ds.service AS 'serviceID', s.name AS 'serviceName' FROM `doctor-service` ds, `services` s WHERE s.id = ds.service;"
      );

    const response = clinics.map((clinic) => {
      let doctorIDs = clinicDoctorRel
        .filter((rel) => rel.clinic == clinic.id)
        .map((rel) => rel.doctor);

      clinic.doctors = doctorIDs.map(
        (id) =>
          new Object({
            id,
            name: doctors[`${id}`].name,
            services: Array.from(
              new Set(
                services
                  .filter((service) => service.doctorID === id)
                  .map((service) => service.serviceName)
              )
            ),
          })
      );

      clinic.services = Array.from(
        services
          .filter((service, index, array) =>
            doctorIDs.includes(service.doctorID)
          )
          .map(
            (service) =>
              new Object({ name: service.serviceName, id: service.serviceID })
          )
      );
      return clinic;
    });

    return response;
  }

  static async findClinics({ clinicsArray, servicesArray, doctorsArray } = {}) {
    if (clinicsArray && typeof clinicsArray == "number")
      clinicsArray = [clinicsArray];
    if (servicesArray && typeof servicesArray == "number")
      servicesArray = [servicesArray];
    if (doctorsArray && typeof doctorsArray == "number")
      doctorsArray = [doctorsArray];

    if (clinicsArray) return this.getClinics({ clinicIDs: clinicsArray });

    let clinicIDs = [];
    if (doctorsArray) {
      const [clinicDoctorRel] = await db
        .promise()
        .query(
          `SELECT DISTINCT(clinic) AS clinicID FROM \`clinic-doctor\` WHERE doctor IN (${doctorsArray
            .reduce((acc, curr) => acc + `'${curr}',`, "")
            .slice(0, -1)});`
        );
      clinicIDs.push(...clinicDoctorRel.map((rel) => rel.clinicID));
    }

    if (servicesArray) {
      const [clinicServiceRel] = await db
        .promise()
        .query(
          `SELECT DISTINCT(cd.clinic) AS clinicID FROM \`clinic-doctor\`cd WHERE cd.doctor IN (SELECT ds.doctor FROM \`doctor-service\` ds WHERE ds.service IN (${servicesArray
            .reduce((acc, curr) => acc + `'${curr}',`, "")
            .slice(0, -1)}));`
        );
      if (clinicIDs.length > 0) {
        const clinicsFromRel = clinicServiceRel.map((rel) => rel.clinicID);
        clinicIDs = clinicIDs.filter((id) => clinicsFromRel.includes(id));
      } else clinicIDs.push(...clinicServiceRel.map((rel) => rel.clinicID));
    }

    return this.getClinics({ clinicIDs });
  }

  static async createClinic(name) {
    const [nameExists] = await db
      .promise()
      .query(`SELECT name FROM clinics WHERE \`name\`='${name}';`);
    if (nameExists.length > 0) throw new Error("Clinic name already exists.");

    return db
      .promise()
      .query(`INSERT INTO clinics(name) VALUES ('${name}');`)
      .then((resp) => {
        const id = resp[0].insertId;
        return { id, name };
      });
  }

  static async deleteClinic(id) {
    if (!id) return undefined;
    return db
      .promise()
      .query(`DELETE FROM clinics WHERE \`id\`=${id};`)
      .then((resp) => {
        return undefined;
      });
  }

  static async updateClinic(id, name) {
    const [nameExists] = await db
      .promise()
      .query(
        `SELECT name FROM clinics WHERE \`name\`='${name}' AND \`id\`!=${id};`
      );
    if (nameExists.length > 0) throw new Error("Clinic name already exists.");

    return db
      .promise()
      .query(`UPDATE clinics SET \`name\`='${name}' WHERE \`id\`=${id};`)
      .then((resp) => {
        return { id, name };
      });
  }
}

module.exports = Clinic;
