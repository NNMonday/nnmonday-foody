const { Order, OrderStatus } = require("../models");
const { User } = require("../models");

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

async function getListOrder() {
  const listOrder = await Order.find()
    .populate("customer_id") // Populates customer information
    .populate("restaurant_id") // Populates restaurant information
    .populate({
      path: "dishes.dish_id", // Populates each dish within dishes array
    })
    .populate("status") // Populates order status information
    .populate("address.city_id") // Populates city information
    .populate("address.district_id") // Populates district information
    .populate("address.ward_id");

  const ordersWithCustomerName = await Promise.all(
    listOrder.map(async (order) => {
      const customer = await User.findById(order.customer_id.user_id);

      return {
        ...order.toObject(),
        customer,
      };
    })
  );
  return ordersWithCustomerName;
}

module.exports = {
  getListOrder,
  getTotalDelivered,
  create,
  getByRestaurantId,
};
