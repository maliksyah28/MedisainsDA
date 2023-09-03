const express = require("express");
const { authController } = require("../controllers");
const routers = express.Router();

routers.post("/register", authController.register);
routers.post("/login", authController.login);

module.exports = routers;
