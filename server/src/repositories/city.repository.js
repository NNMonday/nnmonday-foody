const { City } = require("../models");

const findAll = async () => {
  return await City.find().exec();
};

module.exports = {
  findAll,
};
