const express = require("express");
const { OrderController } = require("../controllers");
const { AuthMiddleware } = require("../middlewares");
const OrderRouter = express.Router();

OrderRouter.get("/total", OrderController.getTotalDelivered);
OrderRouter.post("/", AuthMiddleware.verifyToken, OrderController.create);

module.exports = OrderRouter;
