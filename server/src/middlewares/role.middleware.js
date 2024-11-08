const { UserService } = require("../services");
const httpErrors = require("http-errors");

const verifyRole = (roles = []) => {
  return async (req, res, next) => {
    try {
      const { _id } = req.decodedToken;
      const role = await UserService.findRoleById(_id);

      if (roles.length === 0 || !roles.includes(role)) {
        throw httpErrors.Forbidden(
          "You are not allowed to perform this action"
        );
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { verifyRole };
