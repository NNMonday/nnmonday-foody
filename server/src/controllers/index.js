const AuthController = require("./auth.controller");
const UserController = require("./user.controller");
const RoleControler = require("./role.controller");
const CategoryDishController = require("./categoryDish.controller");
const RestaurantController = require("./restaurant.controller");
const DishController = require("./dish.controller");
const CustomerController = require("./customer.controller");
const OrderController = require("./order.controller");
const AddressController = require("./address.controller");

module.exports = {
  UserController,
  RestaurantController,
  AuthController,
  RoleControler,
  CategoryDishController,
  DishController,
  CustomerController,
  OrderController,
  AddressController,
};
