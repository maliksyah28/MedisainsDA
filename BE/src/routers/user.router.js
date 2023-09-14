const express = require('express');
const { userController } = require('../controllers');
const { auth } = require('../helpers/auth');
const { changePassword, getUserByToken } = userController;

const routers = express.Router();

routers.patch('/changePass', auth, changePassword);
routers.get('/user-token', auth, getUserByToken);

module.exports = routers;
