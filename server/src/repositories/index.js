const UserRepository = require("./user.repository");
const RoleRepository = require("./role.repository");
const CustomerRepository = require("./customer.repository");
const CategoryDishRepository = require("./categoryDish.repository");
const RestaurantRepository = require("./restaurant.repository");
const DishRepository = require("./dish.repository");
const OrderRepository = require("./order.repository");
const CityRepository = require("./city.repository");
const DistrictRepository = require("./district.repository");
const WardRepository = require("./ward.repository");

module.exports = {
  WardRepository,
  DistrictRepository,
  UserRepository,
  RoleRepository,
  CustomerRepository,
  CategoryDishRepository,
  RestaurantRepository,
  DishRepository,
  CityRepository,
  OrderRepository,
};
