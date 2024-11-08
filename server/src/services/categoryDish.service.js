const { CategoryDishRepository } = require("../repositories");

const getMostPopular = async (pageNumber, pageCount) => {
  try {
    return await CategoryDishRepository.getMostPopular(pageNumber, pageCount);
  } catch (error) {
    throw error;
  }
};

const findAll = async () => {
  try {
    return await CategoryDishRepository.findAll();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getMostPopular,
  findAll,
};
