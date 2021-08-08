const Clinic = require("../models/Clinic");
const { validationResult } = require("express-validator");

module.exports.getClinicsList = async (req, res, next) => {
  try {
    const clinics = await Clinic.getClinics();
    res.status(200).json({ data: clinics });
  } catch (error) {
    if (!error.statusCode) error.statusCode = 503;
    next(error);
    return error;
  }
};

module.exports.postCreateClinic = async (req, res, next) => {
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

    const clinicName = req.body.name;

    Clinic.createClinic(clinicName)
      .then((result) => {
        console.log(result);
        res.status(200).json({ status: "Clinic created", data: result });
      })
      .catch((error) => {
        if (!error.statusCode) error.statusCode = 422;
        throw error;
      });
  } catch (error) {
    if (!error.statusCode) error.statusCode = 503;
    next(error);
    return error;
  }
};

module.exports.postUpdateClinic = async (req, res, next) => {
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

    const clinicName = req.body.name;
    const clinicID = req.body.id;

    Clinic.updateClinic(clinicID, clinicName)
      .then((result) => {
        console.log(result);
        res.status(200).json({ status: "Clinic updated", data: result });
      })
      .catch((error) => {
        if (!error.statusCode) error.statusCode = 422;
        throw error;
      });
  } catch (error) {
    if (!error.statusCode) error.statusCode = 503;
    next(error);
    return error;
  }
};

module.exports.postDeleteClinic = async (req, res, next) => {
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

    const clinicID = req.body.id;

    Clinic.deleteClinic(clinicID)
      .then(() => {
        res.status(200).json({ status: "Clinic deleted" });
      })
      .catch((error) => {
        if (!error.statusCode) error.statusCode = 422;
        throw error;
      });
  } catch (error) {
    if (!error.statusCode) error.statusCode = 503;
    next(error);
    return error;
  }
};

module.exports.getFindClinics = async (req, res, next) => {
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

    const servicesArray = req.body.services;
    const doctorsArray = req.body.doctors;
    const clinicsArray = req.body.clinics;

    const clinics = await Clinic.findClinics({
      clinicsArray,
      doctorsArray,
      servicesArray,
    });

    res.status(200).json({ data: clinics });
  } catch (error) {
    if (!error.statusCode) error.statusCode = 503;
    next(error);
    return error;
  }
};
