const Doctor = require("../models/Doctor");
const { validationResult } = require("express-validator");

module.exports.getDoctorsList = async (req, res, next) => {
  try {
    const doctors = await Doctor.getDoctors();
    res.status(200).json({ data: doctors });
  } catch (error) {
    if (!error.statusCode) error.statusCode = 503;
    next(error);
    return error;
  }
};

module.exports.getFindDoctors = async (req, res, next) => {
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

    const doctors = await Doctor.findDoctor({ servicesArray, doctorsArray });
    res.status(200).json({ data: doctors });
  } catch (error) {
    if (!error.statusCode) error.statusCode = 503;
    next(error);
    return error;
  }
};

//Create,Update,Delete
module.exports.postCreateDoctor = async (req, res, next) => {
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

    const doctorName = req.body.name;
    const doctorClinics = req.body.clinics;
    const doctorServices = req.body.services;

    Doctor.createDoctor({
      name: doctorName,
      clinicsArray: doctorClinics,
      servicesArray: doctorServices,
    })
      .then((result) => {
        res.status(200).json({ status: "Doctor created", data: result });
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

module.exports.postUpdateDoctor = async (req, res, next) => {
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

    const doctorName = req.body.name;
    const doctorClinics = req.body.clinics;
    const doctorServices = req.body.services;
    const id = req.body.id;

    Doctor.updateDoctor({
      id,
      name: doctorName,
      clinicsArray: doctorClinics,
      servicesArray: doctorServices,
    })
      .then((result) => {
        res.status(200).json({ status: "Doctor updated", data: result });
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

module.exports.postDeleteDoctor = async (req, res, next) => {
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

    const id = req.body.id;

    Doctor.deleteDoctor(id)
      .then((result) => {
        res.status(200).json({ status: "Doctor deleted" });
      })
      .catch((err) => {
        if (!error.statusCode) error.statusCode = 422;
        throw error;
      });
  } catch (error) {
    if (!error.statusCode) error.statusCode = 503;
    next(error);
    return error;
  }
};
