const { DishController } = require("../controllers");
const express = require("express");
const DishRouter = express.Router();

DishRouter.get("/most-popular", DishController.getMostPopular);
DishRouter.get("/total", DishController.getTotal);
DishRouter.get("/", DishController.find);

module.exports = DishRouter;
