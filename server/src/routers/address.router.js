const { AddressController } = require("../controllers");
const { AuthMiddleware } = require("../middlewares");
const express = require("express");
const Address = express.Router();

Address.get("/", AddressController.find);
Address.get(
  "/user",
  AuthMiddleware.verifyToken,
  AddressController.findByUserId
);

module.exports = Address;
