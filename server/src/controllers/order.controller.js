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

module.exports = {
  getTotalDelivered,
};
