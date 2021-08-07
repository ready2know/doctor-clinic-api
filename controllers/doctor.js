const Doctor = require("../models/Doctor");

module.exports.getDoctorsList = async (req, res, next) => {
  const [rows] = await Doctor.getDoctors();
  res.status(200).json({ doctors: rows });
};

module.exports.postCreateDoctor = async (req, res, next) => {
  const doctorName = req.body.name;
  const doctorClinics = req.body.clinics;
  const doctorServices = req.body.services;
  
  const doctor = new Doctor({name:doctorName, clinics:doctorClinics, services:doctorServices});

  doctor
    .save()
    .then((err,results,fields) => {
      console.log(err);
      res.status(200).json({ status: "Doctor created", data: doctor });
    })
    .catch((err) => {
      err.statusCode = 422;
      next(err);
    });
};

module.exports.postAddDoctorServices = async (req, res, next) => {
  const doctorId = req.body.doctorId;
  const services = req.body.services;
  
  const doctor = new Doctor({id:doctorId});

  doctor.setServices();

  // doctor
  //   .save()
  //   .then((err,results,fields) => {
  //     console.log(err);
  //     res.status(200).json({ status: "Doctor created", data: doctor });
  //   })
  //   .catch((err) => {
  //     err.statusCode = 422;
  //     next(err);
  //   });
};




