const { RestaurantRepository } = require("../repositories");

const getMostPopular = async (pageNumber, pageCount) => {
  try {
    return await RestaurantRepository.getMostPopular(pageNumber, pageCount);
  } catch (error) {
    throw error;
  }
};

const getTotal = async () => {
  try {
    return await RestaurantRepository.getTotal();
  } catch (error) {
    throw error;
  }
};

const findById = async (id) => {
  try {
    return await RestaurantRepository.findById(id);
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    return await RestaurantRepository.getAll();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getMostPopular,
  getTotal,
  findById,
  getAll,
};
