const express = require('express');
const routes = express.Router();
const mainController = require('../controller/mainController');

routes.get('/', mainController.index);

module.exports = routes;


