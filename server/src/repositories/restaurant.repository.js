const { Restaurant, Order } = require("../models");

const create = async (user_id) => {
  const newRestaurant = new Restaurant({ user_id });
  await newRestaurant.save();
  return;
};

async function getMostPopular(pageNumber, pageCount) {
  try {
    const skipCount = (pageNumber - 1) * pageCount;

    const topRestaurants = await Order.aggregate([
      {
        $group: {
          _id: "$restaurant_id",
          orderCount: { $sum: 1 },
        },
      },
      {
        $sort: { orderCount: -1 },
      },
      {
        $skip: skipCount,
      },
      {
        $limit: pageCount,
      },
      {
        $lookup: {
          from: "restaurants",
          localField: "_id",
          foreignField: "_id",
          as: "restaurant",
        },
      },
      {
        $unwind: "$restaurant",
      },
      {
        $lookup: {
          from: "users",
          localField: "restaurant.user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 0,
          restaurant_id: "$restaurant._id",
          name: "$restaurant.name",
          address: "$restaurant.address",
          orderCount: 1,
          userName: "$user.name",
          userAvatar: "$user.avatar",
        },
      },
    ]);

    return topRestaurants;
  } catch (error) {
    throw error;
  }
}

async function getTotal() {
  const totalRestaurants = await Restaurant.countDocuments();
  return totalRestaurants;
}

const findByLocation = async (locationFilter) => {
  return await Restaurant.find(locationFilter, "_id");
};

const findById = async (id) => {
  return await Restaurant.findById(id).populate("user_id").exec();
};

const findByUserId = async (user_id) => {
  return await Restaurant.findOne({ user_id }).exec();
};

const getAll = async () => {
  return await Restaurant.find()
    .populate("user_id")
    .populate("address.city_id address.district_id address.ward_id")
    .exec();
};

module.exports = {
  create,
  getMostPopular,
  getTotal,
  findByLocation,
  findById,
  findByUserId,
  getAll,
};
