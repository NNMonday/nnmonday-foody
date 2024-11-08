const { RoleControler } = require("../controllers");
const express = require("express");
const RoleRouter = express.Router();

RoleRouter.get("/", RoleControler.findAll);

module.exports = RoleRouter;
