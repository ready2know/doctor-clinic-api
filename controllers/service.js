const Service = require("../models/Service");
const { validationResult } = require("express-validator");

module.exports.getServicesList = async (req, res, next) => {
  try {
    const services = await Service.getServices();

    res.status(200).json({ data: services });
  } catch (error) {
    if (!error.statusCode) error.statusCode = 503;
    next(error);
    return error;
  }
};

module.exports.postCreateService = async (req, res, next) => {
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

    const serviceName = req.body.name;

    Service.createService(serviceName)
      .then((result) => {
        res.status(200).json({ status: "Service created", data: result });
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

module.exports.postUpdateService = async (req, res, next) => {
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
    
    const serviceName = req.body.name;
    const serviceID = req.body.id;

    Service.updateService(serviceID, serviceName)
      .then((result) => {
        res.status(200).json({ data: result });
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

module.exports.postDeleteService = async (req, res, next) => {
  try {
    const serviceId = req.body.id;

    Service.deleteService(serviceId).then((result) => {
      res.status(200).json({ status: "Service deleted." });
    });
  } catch (error) {
    if (!error.statusCode) error.statusCode = 503;
    next(error);
    return error;
  }
};
