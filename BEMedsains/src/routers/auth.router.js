const express = require("express");
const { authController } = require("../controllers");
const routers = express.Router();
const { register, login, changePassword } = authController;

routers.post("/register", register);
routers.post("/login", login);
routers.patch("/changePass", changePassword);

module.exports = routers;
