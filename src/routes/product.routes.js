const express = require('express');
const routes = express.Router();
const productController = require('../controller/productController');



routes.get('/catalogue', productController.catalogo);
routes.get('/product-cart/:id?', productController.carrito);
routes.get('/product-detail/:id', productController.detalle);
routes.get('/new-product', productController.nuevoProducto);
routes.get('/update-product', productController.actualizarProducto);

routes.get('/all-products', productController.cargarProductos); //ruta para cargar productos desde admin

routes.delete('/product-cart/:id', productController.deleteCart);

module.exports = routes;