const { Dish, CategoryDish } = require("../models");

async function getMostPopular(pageNumber, pageCount) {
  try {
    const skipCount = (pageNumber - 1) * pageCount;

    const topCategories = await Dish.aggregate([
      {
        $group: {
          _id: "$category_id",
          dishCount: { $sum: 1 },
          restaurantIds: { $addToSet: "$restaurant_id" },
        },
      },
      {
        $addFields: {
          restaurantCount: { $size: "$restaurantIds" },
        },
      },
      {
        $sort: { dishCount: -1 },
      },
      {
        $skip: skipCount,
      },
      {
        $limit: pageCount,
      },
      {
        $lookup: {
          from: "category_dishes",
          localField: "_id",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $project: {
          _id: 0,
          category_id: "$category._id",
          name: "$category.name",
          image: "$category.image",
          description: "$category.description",
          dishCount: 1,
          restaurantCount: 1,
        },
      },
    ]);

    return topCategories;
  } catch (error) {
    throw error;
  }
}

const findAll = async () => {
  try {
    return await CategoryDish.find();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getMostPopular,
  findAll,
};
