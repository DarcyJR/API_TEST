const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const ticketController = require('./src/controllers/ticketController');
const proprietariosController = require('./src/controllers/proprietariosController');
const clienteController = require('./src/controllers/clienteController');
//homeController
route.get('/', homeController.homeGet);

//ticketController
route.post('/webhook', ticketController.homeWebHook);

route.get('/tickets', ticketController.tickets);

route.get('/proprietarios', proprietariosController.getProprietario);
route.post('/proprietarios', proprietariosController.postProprietario);

route.get('/cliente/cliente', clienteController.getCliente);
route.post('/cliente/cliente', clienteController.postCliente);
route.get('/cliente/proprietario', clienteController.getProprietario);
route.post('/cliente/proprietario', clienteController.postProprietario);
module.exports = route;
