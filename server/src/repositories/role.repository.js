const { Role } = require("../models");

const findAll = async () => {
  return await Role.find({ name: { $ne: "admin" } }).exec();
};

const findOneById = async (_id) => {
  return await Role.findOne({ _id, name: { $ne: "admin" } }).exec();
};

module.exports = {
  findAll,
  findOneById,
};
