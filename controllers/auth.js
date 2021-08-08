const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { validationResult } = require("express-validator");

module.exports.postLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(
        "Validation failed, entered data is incorrect..."
      );
      error.statusCode = 422;
      error.data = errors.errors.map((el) => el.msg);
      throw error;
    }

    const login = req.body.login;
    const password = req.body.password;

    const userData = await User.login(login, password);

    const token = jwt.sign(
      {
        login: userData.login,
        userId: userData.id,
      },
      process.env.JWT_SECRET || "supersecret",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token: token.toString(),
      userID: userData.id.toString(),
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
};
