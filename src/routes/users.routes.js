const express = require('express');
const routes = express.Router();
const usersController = require('../controller/usersController');
const upload = require('../middleware/multerMid')


routes.get('/login', usersController.login);
routes.post('/register', upload.single('profileImage'), usersController.register)
routes.get('/admin', usersController.admin);





module.exports = routes;