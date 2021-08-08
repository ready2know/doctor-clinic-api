const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");

const doctorController = require("../controllers/doctor");
const isAuth = require("../middlewares/is-auth");

router.get("/", doctorController.getDoctorsList);

router.get(
  "/find-doctor",
  [
    body("doctors").custom((value) => {
      if (value && !Array.isArray(value))
        throw new Error("Doctors must be an array.");
      return true;
    }),
    body("services").custom((value) => {
      if (value && !Array.isArray(value))
        throw new Error("Services must be an array.");
      return true;
    }),
  ],
  doctorController.getFindDoctors
);

router.post(
  "/create-doctor",
  isAuth,
  [
    body("name").isLength({ min: 3 }).withMessage("Doctor name too short."),
    body("clinics").custom((value) => {
      if (value && !Array.isArray(value))
        throw new Error("Doctors must be an array.");
      return true;
    }),
    body("services").custom((value) => {
      if (value && !Array.isArray(value))
        throw new Error("Services must be an array.");
      return true;
    }),
  ],
  doctorController.postCreateDoctor
);

router.post(
  "/update-doctor",
  isAuth,
  [
    body("id")
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage("ID can't  be empty."),
    body("clinics").custom((value) => {
      if (value && !Array.isArray(value))
        throw new Error("Doctors must be an array.");
      return true;
    }),
    body("services").custom((value) => {
      if (value && !Array.isArray(value))
        throw new Error("Services must be an array.");
      return true;
    }),
  ],
  doctorController.postUpdateDoctor
);

router.post(
  "/delete-doctor",
  isAuth,
  [
    body("id")
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage("ID can't  be empty."),
  ],
  doctorController.postDeleteDoctor
);

module.exports = router;
