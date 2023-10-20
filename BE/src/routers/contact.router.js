const express = require('express');
const routers = express.Router();
const { contactController } = require('../controllers');
const { auth } = require('../helpers/auth');
const { createContact, getAllContact, ContactById ,updateContact} = contactController;

routers.post('/new-Contact',auth, createContact);
routers.get('/allContact', auth, getAllContact);
routers.get('/ContactDetail', auth,ContactById);
routers.patch('/:id',auth, updateContact)
module.exports = routers;
