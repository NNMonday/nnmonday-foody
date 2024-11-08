const express = require("express");
const { OrderController } = require("../controllers");
const { AuthMiddleware, RoleMiddleware } = require("../middlewares");
const OrderRouter = express.Router();

OrderRouter.get("/total", OrderController.getTotalDelivered);
OrderRouter.post("/", AuthMiddleware.verifyToken, OrderController.create);
OrderRouter.get(
  "/",
  [AuthMiddleware.verifyToken, RoleMiddleware.verifyRole(["restaurant"])],
  OrderController.get
);

module.exports = OrderRouter;
