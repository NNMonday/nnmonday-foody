const {
  CityRepository,
  DistrictRepository,
  WardRepository,
} = require("../repositories");

const find = async (cityId, districId) => {
  const result = {
    cityList: [],
    districtList: [],
    wardList: [],
  };
  result.cityList = await CityRepository.findAll();
  if (cityId) {
    result.districtList = await DistrictRepository.findAllByCityId(cityId);
  }
  if (districId) {
    result.wardList = await WardRepository.findAllByDistrictId(districId);
  }
  return result;
};

module.exports = {
  find,
};
