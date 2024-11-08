const { UserRepository } = require("../repositories");

const findRoleById = async (_id) => {
  const result = await UserRepository.findRoleById(_id);
  return result.role.name;
};

const findOneByRefreshToken = async (refreshToken) => {
  return await UserRepository.findOneByRefreshToken(refreshToken);
};

module.exports = { findRoleById, findOneByRefreshToken };
