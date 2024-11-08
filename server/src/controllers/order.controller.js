const { OrderService } = require("../services");

const getTotalDelivered = async (req, res, next) => {
  try {
    const totalDeliveredOrders = await OrderService.getTotalDelivered();
    res.status(200).json({
      message: "Find total delivered orders successfully",
      data: totalDeliveredOrders,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { address, dishes, restaurant_id, note } = req.body;
    const { _id } = req.decodedToken;
    const newOrder = await OrderService.create({
      address,
      dishes,
      user_id: _id,
      restaurant_id,
      note,
    });
    res.status(201).json({
      message: "Create order successfully",
      data: newOrder,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const { _id } = req.decodedToken;
    const orders = await OrderService.get(_id);
    res.status(200).json({
      message: "Find orders successfully",
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTotalDelivered,
  create,
  get,
};
