const { RoleRepository } = require("../repositories");

const findAll = async (req, res, next) => {
  try {
    const roles = await RoleRepository.findAll();
    res.status(200).json({
      message: "Roles retrieved successfully",
      data: roles,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
};
