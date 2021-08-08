const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");

const clinicController = require("../controllers/clinic");
const isAuth = require("../middlewares/is-auth");

router.get("/", clinicController.getClinicsList);

router.get(
  "/find-clinic",
  [
    body("clinics").custom((value) => {
      if (value && !Array.isArray(value))
        throw new Error("Clinics must be array.");
      return true;
    }),
    body("doctors").custom((value) => {
      if (value && !Array.isArray(value))
        throw new Error("Doctors must be array.");
      return true;
    }),
    body("services").custom((value) => {
      if (value && !Array.isArray(value))
        throw new Error("Services must be array.");
      return true;
    }),
  ],
  clinicController.getFindClinics
);

router.post(
  "/create-clinic",
  isAuth,
  [body("name").isLength({ min: 3 }).withMessage("Clinic name too short.")],
  clinicController.postCreateClinic
);

router.post(
  "/update-clinic",
  isAuth,
  [
    body("id")
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage("ID can't  be empty."),
    body("name").isLength({ min: 3 }).withMessage("Clinic name too short."),
  ],
  clinicController.postUpdateClinic
);

router.post(
  "/delete-clinic",
  isAuth,
  [
    body("id")
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage("ID can't  be empty."),
  ],
  clinicController.postDeleteClinic
);

module.exports = router;
