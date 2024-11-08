const { OrderRepository } = require("../repositories");

const getTotalDelivered = async () => {
  return await OrderRepository.getTotalDelivered();
};

module.exports = {
  getTotalDelivered,
};
