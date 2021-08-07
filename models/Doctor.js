const db = require("../config/db");

class Doctor {
  constructor({ id = null, name, clinics, services }) {
    this.id = null;
    this.name = name;
    this.clinics = Array.from(new Set(clinics));
    this.services = Array.from(new Set(services));
  }
  static getDoctors() {
    return db.promise().query("SELECT name FROM doctors;");
  }

  async save() {
    if (!this.name || this.name.length < 1)
      throw Error("Doctor name can't be empty");
    if (!this.clinics || this.clinics.length < 1)
      throw Error("Doctor clinics can't be empty");
    if (!this.services || this.services.length < 1)
      throw Error("Doctor services can't be empty");

    if (this.id === null) return this.createDoctor();
    else return this.updateDoctor();
  }

  async createDoctor() {
    const dbResponse = await db
      .promise()
      .query(`INSERT INTO \`doctors\`(name) VALUES ('${this.name}');`);
    this.id = dbResponse[0].insertId;
    let clinicsQuery = this.clinics
      .reduce((acc, curr) => acc + `(${this.id}, ${curr}),`, "")
      .slice(0, -1);

    await db
      .promise()
      .query(
        `INSERT INTO \`clinic-doctor\`(doctor, clinic) VALUES ${clinicsQuery};`
      );

    let servicesQuery = this.services
      .reduce((acc, curr) => acc + `('${this.id}', '${curr}'),`, "")
      .slice(0, -1);

    return db
      .promise()
      .query(
        `INSERT INTO \`doctor-service\`(doctor, service) VALUES ${servicesQuery};`
      ).then(res=>{
        return this;
      });
    
  }

  async setServices() {
    const [currentServices] = await db
      .promise()
      .query(
        `SELECT service FROM \`doctor-service\` WHERE doctor=${this.id};`
      );

     console.log(currentServices);

  }

  async updateDoctor() {
    let clinicsQuery = this.clinics
      .reduce((acc, curr) => acc + `(${this.id}, ${curr}),`, "")
      .slice(0, -1);

    await db
      .promise()
      .query(
        `UPDATE \`clinic-doctor\` SET ${clinicsQuery} WHERE doctor=${this.id};`
      );

    let servicesQuery = this.services
      .reduce((acc, curr) => acc + `(${this.id}, ${curr}),`, "")
      .slice(0, -1);

    return db
      .promise()
      .query(
        `INSERT INTO \`doctor-service\`(doctor, service) VALUES ${servicesQuery};`
      ).then(res=>{
        return this;
      });
  }
}

module.exports = Doctor;
