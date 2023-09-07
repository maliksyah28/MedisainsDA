const express = require("express");
const { authController } = require("../controllers");
const { auth } = require("../helpers/auth");
const routers = express.Router();
const { register, login, adminRegister } = authController;
// buat superadmin bikin user
routers.post("/register", auth, register);

routers.post("/login", login);

// ini buat bikin super admin
routers.post("/admin-register", adminRegister);

module.exports = routers;
