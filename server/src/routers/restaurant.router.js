const express = require("express");
const { RestaurantController } = require("../controllers");
const RestaurantRouter = express.Router();

RestaurantRouter.get("/most-popular", RestaurantController.getMostPopular);
RestaurantRouter.get("/total", RestaurantController.getTotal);
RestaurantRouter.get("/:id", RestaurantController.findById);
RestaurantRouter.get("/", RestaurantController.getAll);

module.exports = RestaurantRouter;
