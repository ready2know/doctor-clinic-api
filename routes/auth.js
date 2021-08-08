const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const authController = require("../controllers/auth");

router.post(
  "/login",
  [
    body("login").trim().isLength({ min: 3 }).withMessage("Login too short"),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password too short"),
  ],
  authController.postLogin
);

module.exports = router;
