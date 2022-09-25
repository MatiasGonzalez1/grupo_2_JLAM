const express = require('express');
const routes = express.Router();
const usersAPIController = require('../../controller/api/usersAPIController');
const productsAPIController = require('../../controller/api/productsAPIController');

//API usuarios
routes.get('/users', usersAPIController.loadUsers);
routes.get('/users/:id', usersAPIController.userData);

//API productos
routes.get('/product', productsAPIController.loadProducts);
routes.get('/last-added', productsAPIController.lastAdded);
routes.get('/product/page', productsAPIController.ProductPage);
routes.get('/product/:id', productsAPIController.ProductData);

//API categorias
routes.get('/product-category', productsAPIController.getCategories);


module.exports = routes;