const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");

const serviceController = require("../controllers/service");
const isAuth = require("../middlewares/is-auth");

router.get("/", serviceController.getServicesList);

router.post("/create-service", isAuth, serviceController.postCreateService);

router.post("/update-service", isAuth, serviceController.postUpdateService);

router.post("/delete-service", isAuth, serviceController.postDeleteService);

module.exports = router;
