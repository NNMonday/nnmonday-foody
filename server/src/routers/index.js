const AuthRouter = require("./auth.router");
const RoleRouter = require("./role.router");
const CategoryDishRouter = require("./categoryDish.router");
const RestaurantRouter = require("./restaurant.router");
const DishRouter = require("./dish.router");
const CustomerRouter = require("./customer.router");
const OrderRouter = require("./order.router");
const AddressRouter = require("./address.router");
const FileRouter = require("./file.router");

module.exports = {
  AddressRouter,
  AuthRouter,
  RoleRouter,
  CategoryDishRouter,
  RestaurantRouter,
  DishRouter,
  CustomerRouter,
  OrderRouter,
  FileRouter,
};
