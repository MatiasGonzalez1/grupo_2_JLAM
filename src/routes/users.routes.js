const express = require('express');
const routes = express.Router();
const usersController = require('../controller/usersController');

routes.get('/login', usersController.login);



module.exports = routes;