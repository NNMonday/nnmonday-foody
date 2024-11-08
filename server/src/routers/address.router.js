const { AddressController } = require("../controllers");
const express = require("express");
const Address = express.Router();

Address.get("/", AddressController.find);

module.exports = Address;
