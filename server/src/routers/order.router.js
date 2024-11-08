const express = require("express");
const { OrderController } = require("../controllers");
const OrderRouter = express.Router();

OrderRouter.get("/total", OrderController.getTotalDelivered);

module.exports = OrderRouter;
