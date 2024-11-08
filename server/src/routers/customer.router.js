const express = require("express");
const { CustomerController } = require("../controllers");
const { AuthMiddleware, RoleMiddleware } = require("../middlewares");
const CustomerRouter = express.Router();

CustomerRouter.get("/total", CustomerController.getTotal);
CustomerRouter.get(
  "/cart",
  [AuthMiddleware.verifyToken, RoleMiddleware.verifyRole(["customer"])],
  CustomerController.getCart
);

CustomerRouter.post(
  "/cart",
  [AuthMiddleware.verifyToken, RoleMiddleware.verifyRole(["customer"])],
  CustomerController.updateCart
);

module.exports = CustomerRouter;
