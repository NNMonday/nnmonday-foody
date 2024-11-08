const { Order, Dish } = require("../models");

async function getMostPopular(pageNumber, pageCount) {
  try {
    const skipCount = (pageNumber - 1) * pageCount;

    const topDishes = await Order.aggregate([
      {
        $unwind: "$dishes",
      },
      {
        $group: {
          _id: "$dishes.dish_id",
          orderCount: { $sum: "$dishes.quantity" },
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
          from: "dishes",
          localField: "_id",
          foreignField: "_id",
          as: "dish",
        },
      },
      {
        $unwind: "$dish",
      },
      {
        $lookup: {
          from: "restaurants",
          localField: "dish.restaurant_id",
          foreignField: "_id",
          as: "restaurant",
        },
      },
      {
        $unwind: "$restaurant",
      },
      {
        $project: {
          _id: 0,
          dishId: "$dish._id",
          name: "$dish.name",
          description: "$dish.description",
          price: "$dish.price",
          image: "$dish.image",
          orderCount: 1,
          restaurantName: "$restaurant.name",
          restaurantAddress: "$restaurant.address",
        },
      },
    ]);

    return topDishes;
  } catch (error) {
    throw error;
  }
}

async function getTotal() {
  const totalDishes = await Dish.countDocuments();
  return totalDishes;
}
const find = async (filter, skip, limit) => {
  const dishes = await Dish.find(filter)
    .populate("category_id", "name")
    .populate({
      path: "restaurant_id",
      select: "address user_id",
      populate: [
        {
          path: "user_id",
          select: "name",
        },
        { path: "address.city_id", select: "name" },
        { path: "address.district_id", select: "name" },
        { path: "address.ward_id", select: "name" },
      ],
    })
    .skip(skip)
    .limit(limit)
    .lean();

  const dishIds = dishes.map((dish) => dish._id);
  const soldCounts = await Order.aggregate([
    { $unwind: "$dishes" },
    { $match: { "dishes.dish_id": { $in: dishIds } } },
    {
      $group: {
        _id: "$dishes.dish_id",
        totalSold: { $sum: "$dishes.quantity" },
      },
    },
  ]);

  const soldCountMap = soldCounts.reduce((acc, item) => {
    acc[item._id] = item.totalSold;
    return acc;
  }, {});

  dishes.forEach((dish) => {
    dish.soldCount = soldCountMap[dish._id] || 0;
  });

  return dishes;
};

const count = async (filter) => {
  return await Dish.countDocuments(filter);
};

const findOneById = async (id) => {
  return await Dish.findById(id);
};

module.exports = {
  getMostPopular,
  getTotal,
  find,
  count,
  findOneById,
};
