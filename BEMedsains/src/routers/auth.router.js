const express = require("express");
const { authController } = require("../controllers");
const { auth } = require("../helpers/auth");
const routers = express.Router();

const { register, login, adminRegister } = authController;

routers.post("/register", auth, register);
routers.post("/login", login);
routers.post("/admin-register", adminRegister);

module.exports = routers;
