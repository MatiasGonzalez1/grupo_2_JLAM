const express = require('express');
const routes = express.Router();
const productController = require('../controller/productController');

routes.get('/catalogue', productController.catalogo);
routes.get('/product-cart', productController.carrito);
routes.get('/product-detail', productController.detalle);



module.exports = routes;