const express = require('express');
const routes = express.Router();
const productController = require('../controller/productController');
const upload = require('../middleware/multerMidProducts')
const adminMid = require('../middleware/adminMiddleware');

routes.get('/catalogue', productController.catalogo);
routes.get('/product-cart', productController.carrito);
routes.post('/product-cart/:id', productController.agregarCarrito);
routes.get('/product-detail/:id', productController.detalle);

//cargar productos
routes.get('/all-products', adminMid, productController.cargarProductos);

// nuevo producto
routes.get('/new-product', adminMid, productController.nuevoProducto);
routes.post('/new-product', [upload, adminMid], productController.crearProducto);

//actualizar productos
routes.get('/update-product/:id', adminMid, productController.verActualizarProducto);
routes.put('/update-product', [adminMid, upload], productController.enviarActualizarProducto);

//eliminar productos
routes.delete('/all-products/:id', adminMid, productController.delete);


//eliminar item de mi carrito de compras
routes.delete('/product-cart/:id', productController.deleteCart);

module.exports = routes;