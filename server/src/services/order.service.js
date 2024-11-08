const {
  OrderRepository,
  CustomerRepository,
  RestaurantRepository,
} = require("../repositories");

const getTotalDelivered = async () => {
  return await OrderRepository.getTotalDelivered();
};

const create = async ({ address, dishes, user_id, restaurant_id, note }) => {
  const { _id } = await CustomerRepository.findByUserId(user_id);
  return await OrderRepository.create({
    address,
    dishes,
    customer_id: _id,
    restaurant_id,
    note,
  });
};
const getListOrder = async () => {
  return await OrderRepository.getListOrder();
};

const get = async (user_id) => {
  const { _id: restaurant_id } = await RestaurantRepository.findByUserId(
    user_id
  );
  const orders = await OrderRepository.getByRestaurantId(restaurant_id);
  return orders;
};

module.exports = {
  getListOrder,
  getTotalDelivered,
  create,
  get,
};
