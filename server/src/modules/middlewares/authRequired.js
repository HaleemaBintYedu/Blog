const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");

exports.authRequired = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    next(createHttpError(403, "Please login to access this page"));
  }

  const token = auth.split(" ")[1];
  if (!token) {
    next(createHttpError(403, "Please login to access this page"));
  }

  const user = jwt.verify(token, process.env.JWT_SECRET);
  if (!user) {
    next(createHttpError(403, "Please login to access this page"));
  }

  req.user = user;
  next();
};
