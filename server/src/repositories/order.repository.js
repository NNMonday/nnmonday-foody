const { Order, OrderStatus } = require("../models");

async function getTotalDelivered() {
  const deliveredStatus = await OrderStatus.findOne({ name: "Delivered" });
  const totalDeliveredOrders = await Order.countDocuments({
    status: deliveredStatus._id,
  });
  return totalDeliveredOrders;
}

module.exports = {
  getTotalDelivered,
};
