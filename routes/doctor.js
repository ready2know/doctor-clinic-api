const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");

const medicController = require("../controllers/doctor");
const isAuth = require("../middlewares/is-auth");

router.get("/", medicController.getDoctorsList);
router.post("/create-doctor",isAuth, medicController.postCreateDoctor);
router.post("/update-doctor",isAuth, medicController.postAddDoctorServices);

module.exports = router;
