const { District } = require("../models");

const findAllByCityId = async (cityId) => {
  try {
    const districts = await District.find({ city_id: cityId })
      .select("name")
      .exec();
    return districts;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findAllByCityId,
};
