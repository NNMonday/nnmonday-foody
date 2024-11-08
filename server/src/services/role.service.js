const { RoleRepository } = require("../repositories");

const findAll = async () => {
  return await RoleRepository.findAll();
};

module.exports = {
  findAll,
};
