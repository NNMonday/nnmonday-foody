const express = require("express");
const UserRouter = express.Router();
const { User } = require("../models");

UserRouter.get("/list", async (req, res, next) => {
  try {
    const listUser = await User.find().populate("role");
    res.json(listUser); 
  } catch (error) {
    next(error);
  }
});

module.exports = UserRouter;
