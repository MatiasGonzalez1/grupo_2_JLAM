const express = require('express');
const routes = express.Router();
const usersController = require('../controller/usersController');
const upload = require('../middleware/multerMidUsers')


routes.get('/login', usersController.login);
routes.post('/register', upload, usersController.register);
routes.get('/admin', usersController.admin);





module.exports = routes;