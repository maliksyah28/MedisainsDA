const express = require("express");
const { userController } = require("../controllers");
const { auth } = require("../helpers/auth");
const { changePassword, getUserByToken, getAllUser } = userController;

const routers = express.Router();

routers.patch("/changePass", auth, changePassword);
routers.get("/user-token", auth, getUserByToken);
routers.get("/users", auth, getAllUser);

module.exports = routers;
