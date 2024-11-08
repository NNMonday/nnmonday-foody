const { DishRepository, RestaurantRepository } = require("../repositories");

const getMostPopular = async (pageNumber, pageCount) => {
  try {
    return await DishRepository.getMostPopular(pageNumber, pageCount);
  } catch (error) {
    throw error;
  }
};

const getTotal = async () => {
  try {
    return await DishRepository.getTotal();
  } catch (error) {
    throw error;
  }
};

const find = async ({
  name,
  category_id,
  city_id,
  district_id,
  ward_id,
  pageNumber = 1,
  pageSize = 10,
}) => {
  const filter = {};

  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }

  if (category_id) {
    filter.category_id = category_id;
  }

  if (city_id || district_id || ward_id) {
    const locationFilter = {};
    if (city_id) locationFilter["address.city_id"] = city_id;
    if (district_id) locationFilter["address.district_id"] = district_id;
    if (ward_id) locationFilter["address.ward_id"] = ward_id;

    const restaurants = await RestaurantRepository.findByLocation(
      locationFilter
    );
    filter.restaurant_id = {
      $in: restaurants.map((restaurant) => restaurant._id),
    };
  }

  const skip = (parseInt(pageNumber) - 1) * parseInt(pageSize);
  const limit = parseInt(pageSize);

  const dishes = await DishRepository.find(filter, skip, limit);
  const totalCount = await DishRepository.count(filter);
  const totalPageCount = Math.ceil(totalCount / pageSize);

  const formattedDishes = dishes.map((dish) => ({
    _id: dish._id,
    name: dish.name,
    image: dish.image,
    price: dish.price,
    soldCount: dish.soldCount,
    category: dish.category_id?.name || "",
    restaurant: {
      _id: dish.restaurant_id._id,
      name: dish.restaurant_id?.user_id?.name || "",
      address: `${dish.restaurant_id?.address?.detail}, ${dish.restaurant_id?.address?.ward_id?.name}, ${dish.restaurant_id?.address?.district_id?.name}, ${dish.restaurant_id?.address?.city_id?.name}`,
    },
  }));

  return {
    data: formattedDishes,
    totalPageCount,
    currentPage: parseInt(pageNumber),
  };
};

module.exports = {
  getMostPopular,
  getTotal,
  find,
};
