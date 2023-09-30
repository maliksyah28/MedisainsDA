const express = require('express');
const routers = express.Router();
const { contactController } = require('../controllers');
const { auth } = require('../helpers/auth');
const { createContact, getAllContact, ContactById } = contactController;

routers.post('/new-Contact', createContact);
routers.get('/allContact', getAllContact);
routers.get('/ContactDetail', ContactById);
module.exports = routers;
