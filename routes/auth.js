const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");

const authController = require("../controllers/auth");
const isAuth = require("../middlewares/is-auth");

router.post("/login", authController.postLogin);


module.exports = router;
