const { CustomerService } = require("../services");

const getTotal = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "Find total customers successfully",
      data: await CustomerService.getTotal(),
    });
  } catch (error) {
    next(error);
  }
};

const getCart = async (req, res, next) => {
  try {
    const { _id } = req.decodedToken;
    res.status(200).json({
      message: "Find cart successfully",
      data: await CustomerService.getCart(_id),
    });
  } catch (error) {
    next(error);
  }
};

const updateCart = async (req, res, next) => {
  try {
    const { _id } = req.decodedToken;
    const { newCart } = req.body;
    const { data, message } = await CustomerService.updateCart(_id, newCart);
    res.status(200).json({
      message,
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTotal,
  getCart,
  updateCart,
};
