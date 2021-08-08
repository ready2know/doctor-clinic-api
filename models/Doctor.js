const db = require("../config/db");

class Doctor {
  static async getDoctors({ doctorIDs } = {}) {
    let doctorsQuery = "SELECT id, name FROM doctors;";
    if (doctorIDs) {
      if (doctorIDs.length > 0) {
        doctorsQuery = `SELECT id, name FROM doctors WHERE id IN (${doctorIDs
          .reduce((acc, curr) => acc + `${curr},`, "")
          .slice(0, -1)});`;
      } else return [];
    }

    const [doctors] = await db.promise().query(doctorsQuery);
    const [clinicDoctorRel] = await db
      .promise()
      .query(
        "SELECT cd.doctor AS 'doctorID', cd.clinic AS 'clinicID', c.name AS 'clinicName' FROM `clinic-doctor` cd, `clinics` c WHERE c.id = cd.clinic;"
      );
    const [services] = await db
      .promise()
      .query(
        "SELECT ds.doctor AS 'doctorID', ds.service AS 'serviceID', s.name AS 'serviceName' FROM `doctor-service` ds, `services` s WHERE s.id = ds.service;"
      );

    const result = doctors.map((doctor) => {
      doctor.clinics = clinicDoctorRel
        .filter((rel) => rel.doctorID === doctor.id)
        .map((rel) => new Object({ name: rel.clinicName, id: rel.clinicID }));

      doctor.services = services
        .filter((service) => service.doctorID === doctor.id)
        .map(
          (service) =>
            new Object({ name: service.serviceName, id: service.serviceID })
        );

      return doctor;
    });

    return result;
  }

  static async findDoctor({ doctorsArray, servicesArray } = {}) {
    if (servicesArray && typeof servicesArray == "number")
      servicesArray = [servicesArray];
    if (doctorsArray && typeof doctorsArray == "number")
      doctorsArray = [doctorsArray];
    if (doctorsArray) return this.getDoctors({ doctorIDs: doctorsArray });

    const doctorIDs = [];

    if (servicesArray) {
      const [doctorServiceRel] = await db
        .promise()
        .query(
          `SELECT DISTINCT(ds.doctor) FROM \`doctor-service\` ds WHERE ds.service IN (${servicesArray
            .reduce((acc, curr) => acc + `'${curr}',`, "")
            .slice(0, -1)});`
        );

      doctorIDs.push(...doctorServiceRel.map((rel) => rel.doctor));
    }

    return this.getDoctors({ doctorIDs });
  }

  static async createDoctor({ name, servicesArray, clinicsArray }) {
    if (!name || name.length < 1) throw Error("Doctor's name can't be empty");

    const dbResponse = await db
      .promise()
      .query(`INSERT INTO \`doctors\`(name) VALUES ('${name}');`);

    const id = dbResponse[0].insertId;

    if (clinicsArray) {
      let clinicsQuery = clinicsArray
        .reduce((acc, curr) => acc + `(${id}, ${curr}),`, "")
        .slice(0, -1);

      await db
        .promise()
        .query(
          `INSERT INTO \`clinic-doctor\`(doctor, clinic) VALUES ${clinicsQuery};`
        );
    }
    if (servicesArray) {
      let servicesQuery = servicesArray
        .reduce((acc, curr) => acc + `('${id}', '${curr}'),`, "")
        .slice(0, -1);

      await db
        .promise()
        .query(
          `INSERT INTO \`doctor-service\`(doctor, service) VALUES ${servicesQuery};`
        );
    }

    return this.getDoctors({ doctorIDs: [id] });
  }

  static async updateDoctor({ id, name, clinicsArray, servicesArray } = {}) {
    if (!id) throw new Error("id can't be empty.");

    if (name) {
      await db
        .promise()
        .query(`UPDATE doctors SET \`name\`='${name}' WHERE \`id\`='${id}';`);
    }

    if (clinicsArray) {
      // Query DELETE... WHERE clinic NOT IN (...) AND doctor = id

      if (clinicsArray.length > 0) {
        await db
          .promise()
          .query(
            `DELETE FROM \`clinic-doctor\` WHERE doctor=${id} AND clinic NOT IN (${clinicsArray
              .reduce((acc, curr) => acc + `${curr},`, "")
              .slice(0, -1)})`
          );
        let clinicsQuery = clinicsArray
          .reduce((acc, curr) => acc + `(${curr},${id}),`, "")
          .slice(0, -1);
        await db
          .promise()
          .query(
            `INSERT INTO \`clinic-doctor\`(\`clinic\`,\`doctor\`) VALUES ${clinicsQuery} ON DUPLICATE KEY UPDATE doctor=doctor;`
          );
      } else {
        await db
          .promise()
          .query(`DELETE FROM \`clinic-doctor\` WHERE doctor=${id};`);
      }
    }

    if (servicesArray) {
      // Query DELETE... WHERE clinic NOT IN (...) AND doctor = id
      if (servicesArray.length > 0) {
        await db
          .promise()
          .query(
            `DELETE FROM \`doctor-service\` WHERE doctor=${id} AND service NOT IN (${servicesArray
              .reduce((acc, curr) => acc + `${curr},`, "")
              .slice(0, -1)})`
          );
        let servicesQuery = servicesArray
          .reduce((acc, curr) => acc + `(${curr},${id}),`, "")
          .slice(0, -1);
        await db
          .promise()
          .query(
            `INSERT INTO \`doctor-service\`(\`service\`,\`doctor\`) VALUES ${servicesQuery} ON DUPLICATE KEY UPDATE doctor=doctor;`
          );
      } else {
        await db
          .promise()
          .query(`DELETE FROM \`doctor-service\` WHERE doctor='${id}';`);
      }
    }

    return this.getDoctors({ doctorIDs: [id] });
  }

  static async deleteDoctor(id = undefined) {
    if (!id) throw new Error("id can't be empty.");
    return db.promise().query(`DELETE FROM doctors WHERE \`id\`='${id}';`);
  }
}

module.exports = Doctor;
