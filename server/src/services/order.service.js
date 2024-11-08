const { OrderRepository, CustomerRepository } = require("../repositories");

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

module.exports = {
  getTotalDelivered,
  create,
};
