const { Customer } = require("../models");

const create = async (user_id) => {
  const newCustomer = new Customer({ user_id });
  await newCustomer.save();
  return;
};

async function getTotal() {
  const totalCustomers = await Customer.countDocuments();
  return totalCustomers;
}

const getCart = async (_id) => {
  try {
    return await Customer.findOne({ user_id: _id })
      .populate("cart.dish_id")
      .select("cart");
  } catch (error) {
    throw error;
  }
};

const updateCart = async (_id, newCart) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { user_id: _id },
      { cart: newCart },
      { new: true }
    )
      .populate("cart.dish_id")
      .select("cart");
    return customer.cart;
  } catch (error) {
    throw error;
  }
};

const findCartById = async (_id) => {
  try {
    return await Customer.findOne({ user_id: _id })
      .populate("cart.dish_id")
      .select("cart");
  } catch (error) {
    throw error;
  }
};

const findAllAddressByUserId = async (user_id) => {
  const { addresses } = await Customer.findOne({ user_id })
    .populate("addresses.city_id addresses.district_id addresses.ward_id")
    .select("addresses")
    .exec();

  return addresses;
};

const findByUserId = async (user_id) => {
  return await Customer.findOne({ user_id });
};

module.exports = {
  create,
  getCart,
  getTotal,
  updateCart,
  findCartById,
  findAllAddressByUserId,
  findByUserId,
};
