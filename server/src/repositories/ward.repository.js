const { Ward } = require("../models");

const findAllByDistrictId = async (districtId) => {
  try {
    const wards = await Ward.find({ district_id: districtId })
      .select("name")
      .exec();
    return wards;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findAllByDistrictId,
};
