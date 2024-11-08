const jwt = require("jsonwebtoken");
const httpErrors = require("http-errors");

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      throw httpErrors(403, "Please login to continue");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.decodedToken = decodedToken;

    next();
  } catch (error) {
    next(error);
  }
};
module.exports = { verifyToken };
