const express = require("express");
const CategoryDishRouter = express.Router();
const { CategoryDishController } = require("../controllers");

CategoryDishRouter.get("/most-popular", CategoryDishController.getMostPopular);
CategoryDishRouter.get("/", CategoryDishController.findAll);

module.exports = CategoryDishRouter;
