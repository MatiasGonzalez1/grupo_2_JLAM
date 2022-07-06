const express = require('express');
const routes = express.Router();
const usersController = require('../controller/usersController');
const upload = require('../middleware/multerMidUsers')
const adminMid = require('../middleware/adminMiddleware');
const guestMid = require('../middleware/guestMiddleware');


routes.get('/edit-user/:id', usersController.userData);
routes.put('/edit-user', usersController.userEdit);
routes.get('/login', guestMid, usersController.login);
routes.post('/login', guestMid, usersController.processLogin);
routes.post('/register', [upload, guestMid], usersController.register)
routes.get('/admin', adminMid, usersController.admin);



module.exports = routes;