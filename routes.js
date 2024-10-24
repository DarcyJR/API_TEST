const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');

route.get('/', homeController.homeGet);

route.post('/webhook', homeController.homeWebHook);

/*
route.post('/', homeController.homePost);

route.put("/:id", homeController.homePut);

route.delete("/:id", homeController.homeDelete);*/

module.exports = route;
