const express = require('express');
const routes = express.Router();
const usersController = require('../controller/usersController');
const upload = require('../middleware/multerMidUsers')
const adminMid = require('../middleware/adminMiddleware');
const guestMid = require('../middleware/guestMiddleware');
const registerValid = require('../middleware/registerMidValidator');
const updateUser = require('../middleware/updateUserMidValidator');
const userLogg = require('../middleware/userLoggedMiddleware');
const loginValid = require('../middleware/loginMidValidator');


routes.get('/edit-user/:id', userLogg,usersController.userData);
routes.put('/edit-user', [userLogg, upload, updateUser], usersController.userEdit);

routes.get('/edit-permissions/:id', adminMid,usersController.userPermissions);
routes.put('/edit-permissions', [adminMid, upload], usersController.permissionsProcess);

routes.get('/login', guestMid, usersController.login);
routes.post('/login',  loginValid, usersController.processLogin);
routes.get('/register', guestMid, usersController.registerView);
routes.post('/register', [upload, guestMid], registerValid ,usersController.register)
routes.get('/logout',usersController.logout)

routes.get('/all-users', adminMid,usersController.cargarUsuarios);
routes.delete('/all-users/:id', [adminMid], usersController.delete);
routes.get('/admin', adminMid, usersController.admin);
routes.get('/shipping-cost/:id',usersController.getShippingCost);



module.exports = routes;