const db = require("../config/db");

class Clinic {
  constructor(name) {
    this.name = name;
  }
  
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
      .query("SELECT doctor, service FROM `doctor-service`;");

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
                  .filter((service) => service.doctor == id)
                  .map((service) => service.service)
              )
            ),
          })
      );
      clinic.services = Array.from(
        new Set(
          services
            .filter((service) => doctorIDs.includes(service.doctor))
            .map((service) => service.service)
        )
      );
      return clinic;
    });

    console.log(
      clinics,
      doctors,
      clinicDoctorRel,
      services,
      JSON.stringify(response, null, 2)
    );

    return response;
  }

  static async findClinics({ clinicsArray, servicesArray, doctorsArray } = {}) {
    if (clinicsArray) return this.getClinics({ clinicIDs: clinicsArray });
    let clinicIDs = [];
    if (doctorsArray) {
      const [clinicDoctorRel] = await db
        .promise()
        .query(
          `SELECT DISTINCT(clinic) FROM \`clinic-doctor\` WHERE doctor IN (${doctorsArray
            .reduce((acc, curr) => acc + `'${curr}',`, "")
            .slice(0, -1)});`
        );
      clinicIDs.push(...clinicDoctorRel.map((rel) => rel.clinic));
    }

    if (servicesArray) {
      const [clinicDoctorRel] = await db
        .promise()
        .query(
          `SELECT DISTINCT(cd.clinic) FROM \`clinic-doctor\`cd WHERE cd.doctor IN (SELECT ds.doctor FROM \`doctor-service\` ds WHERE ds.service IN (${servicesArray
            .reduce((acc, curr) => acc + `'${curr}',`, "")
            .slice(0, -1)}));`
        );
      if (clinicIDs.length > 0) {
        const clinicsFromRel = clinicDoctorRel.map((rel) => rel.clinic);
        clinicIDs = clinicIDs.filter((id) => clinicsFromRel.includes(id));
      } else clinicIDs.push(...clinicDoctorRel);
    }

    return this.getClinics({ clinicIDs });
  }

  async save() {
    if (!this.name || this.name.length < 1)
      throw Error("Clinic name can't be empty.");
    return db
      .promise()
      .query(`INSERT INTO clinics(name) VALUES ('${this.name}')`)
      .then((resp) => {
        this.id = resp[0].insertId;
        return this;
      });
  }
}

module.exports = Clinic;
