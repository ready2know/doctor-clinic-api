const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    next(error);
    return error;
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET || "supersecret");
  } catch (err) {
    //console.error(err);
    const error = new Error("Not valid token.");
    error.statusCode = 401;
    next(error);
    return error;
  }

  if (!decodedToken) {
    //console.error(err);
    const error = new Error("Not valid token.");
    error.statusCode = 401;
    next(error);
    return error;
  }

  next();
};
