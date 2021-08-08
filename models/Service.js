const db = require("../config/db");

class Service {
  static async getServices() {
    const [services] = await db
      .promise()
      .query("SELECT id,name FROM `services`;");

    return services;
  }

  static async createService(name) {
    if (!name) throw new Error("Service name can't be empty");

    return db
      .promise()
      .query(
        `INSERT INTO \`services\`(name) VALUES ('${name}') ON DUPLICATE KEY UPDATE name=name;`
      )
      .then((response) => {
        console.log(response);
        return { name };
      })
      .catch((error) => {
        throw error;
      });
  }

  static async updateService(id, name) {
    if (!name || name.length < 1)
      throw new Error("Service name can't be empty");

    if (!id) throw new Error("id can't be empty");

    const [nameExists] = await db
      .promise()
      .query(
        `SELECT name FROM services WHERE \`name\`='${name}' AND \`id\`!='${id}';`
      );
    if (nameExists.length > 0) throw new Error("Service name already exists.");

    return db
      .promise()
      .query(`UPDATE \`services\` SET name='${name}' WHERE id='${id}';`)
      .then((response) => {
        return { id, name };
      })
      .catch((error) => {
        throw error;
      });
  }

  static async deleteService(id) {
    if (!id) throw new Error("id can't be empty");

    return db
      .promise()
      .query(`DELETE FROM \`services\` WHERE id='${id}'`)
      .then((response) => {})
      .catch((error) => {
        throw error;
      });
  }
}

module.exports = Service;
