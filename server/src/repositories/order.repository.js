const { Order, OrderStatus } = require("../models");

async function getTotalDelivered() {
  const deliveredStatus = await OrderStatus.findOne({ name: "Delivered" });
  const totalDeliveredOrders = await Order.countDocuments({
    status: deliveredStatus._id,
  });
  return totalDeliveredOrders;
}

const create = async ({
  address,
  dishes,
  customer_id,
  restaurant_id,
  note,
}) => {
  const newOrder = Order({
    address,
    dishes,
    customer_id,
    restaurant_id,
    note,
  });
  return await newOrder.save();
};

const getByRestaurantId = async (restaurant_id) => {
  return await Order.find({ restaurant_id }).populate("dishes.dish_id").exec();
};

module.exports = {
  getTotalDelivered,
  create,
  getByRestaurantId,
};
