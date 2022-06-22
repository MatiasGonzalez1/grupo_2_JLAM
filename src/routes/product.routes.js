const express = require('express');
const routes = express.Router();
const productController = require('../controller/productController');



routes.get('/catalogue', productController.catalogo);
routes.get('/product-cart/:id?', productController.carrito);
routes.get('/product-detail/:id', productController.detalle);
routes.get('/all-products', productController.cargarProductos);
routes.get('/new-product', productController.nuevoProducto);

//actualizar productos
routes.get('/update-product/:id', productController.verActualizarProducto);
routes.put('/update-product', productController.enviarActualizarProducto);

//eliminar productos
routes.delete('/all-products/:id', productController.delete);

routes.delete('/product-cart/:id', productController.deleteCart);

module.exports = routes;