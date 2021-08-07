const jwt = require("jsonwebtoken");

const User = require("../models/User");

module.exports.postLogin = async (req, res, next) => {
  try {
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
