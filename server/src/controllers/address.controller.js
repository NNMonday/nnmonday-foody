const { AddressService } = require("../services");

const find = async (req, res, next) => {
  try {
    const { cityId, districtId } = req.query;

    const result = await AddressService.find(cityId, districtId);
    res.status(200).json({
      message: "Find addresses successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const findByUserId = async (req, res, next) => {
  try {
    const { _id } = req.decodedToken;
    const addresses = await AddressService.findByUserId(_id);
    res.status(200).json({
      message: "Find addresses by user successfully",
      data: addresses,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  find,
  findByUserId,
};
