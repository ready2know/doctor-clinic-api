const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");

const clinicController = require("../controllers/clinic");
const isAuth = require("../middlewares/is-auth");

router.get("/", clinicController.getClinicsList);

router.post("/create-clinic", isAuth, clinicController.postCreateClinic);

router.get("/find-clinic", clinicController.getFindClinics);

module.exports = router;
