const Clinic = require("../models/Clinic");

module.exports.getClinicsList = async (req, res, next) => {
  const [rows] = await Clinic.getClinics();
  res.status(200).json({ clinics: rows });
};

module.exports.postCreateClinic = async (req, res, next) => {
  const clinicName = req.body.name;
  const clinic = new Clinic(clinicName);

  clinic
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({ status: "Clinic created", data: result });
    })
    .catch((err) => {
      err.statusCode = 422;
      next(err);
    });
};

module.exports.getFindClinics = async (req, res, next) => {
  const servicesArray = req.body.services;
  const doctorsArray = req.body.doctors;
  const clinicsArray = req.body.clinics;

  const clinics = await Clinic.findClinics({
    clinicsArray,
    doctorsArray,
    servicesArray,
  });

  res.status(200).json({ data: clinics });
};
