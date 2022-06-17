const express = require('express');
const routes = express.Router();
const productController = require('../controller/productController');

routes.get('/catalogue', productController.catalogo);
routes.get('/product-cart', productController.carrito);
routes.get('/product-detail/:id', productController.detalle);
routes.get('/new-product', productController.nuevoProducto);
routes.get('/update-product', productController.actualizarProducto);

routes.get('/all-products', productController.cargarProductos); //ruta para cargar productos desde admin




module.exports = routes;