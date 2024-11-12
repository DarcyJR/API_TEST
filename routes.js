const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const ticketController = require('./src/controllers/ticketController');

//homeController
route.get('/', homeController.homeGet);

//ticketController
route.post('/webhook', ticketController.homeWebHook);

route.get('/tickets', ticketController.tickets);

module.exports = route;
