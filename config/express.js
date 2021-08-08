const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const authRouter = require("../routes/auth");
app.use("/auth", authRouter);

const clinicRouter = require("../routes/clinic");
app.use("/clinic", clinicRouter);

const doctorRouter = require("../routes/doctor");
app.use("/doctor", doctorRouter);

const serviceRouter = require("../routes/service");
app.use("/service", serviceRouter);

app.use((error, req, res, next) => {
  if (!error) {
    return res.status(404).json({ message: "Not Found" });
  }

  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});
module.exports = app;
