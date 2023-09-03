const express = require("express");
const { authController } = require("../controllers");
const routers = express.Router();

const { register, login } = authController;

routers.post("/register", register);
routers.post("/login", login);

module.exports = routers;
