const db = require("../config/db");

class User {
  static async login(login, password) {
    if (!login || login.length<1) {
      const error = new Error("Login is incorect!");
      error.statusCode = 422;
      throw error;
    }
    if (!password || password.length<1) {
      const error = new Error("Password is incorect!");
      error.statusCode = 422;
      throw error;
    }

    const [[userData]] = await db
      .promise()
      .query(
        `SELECT id, login, password FROM users WHERE login='${login}' LIMIT 1;`
      );

    if (!userData) {
      const error = new Error("User not found!");
      error.statusCode = 422;
      throw error;
    }

    if (userData.password !== password) {
      const error = new Error("Password does not match!");
      error.statusCode = 422;
      throw error;
    }

    return userData;
  }
}

module.exports = User;
