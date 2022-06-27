const express = require('express');
const routes = express.Router();
const productController = require('../controller/productController');
const upload = require('../middleware/multerMidProducts')



routes.get('/catalogue', productController.catalogo);
routes.get('/product-cart/:id?', productController.carrito);
routes.get('/product-detail/:id', productController.detalle);
routes.get('/all-products', productController.cargarProductos);


routes.get('/new-product', productController.nuevoProducto);
routes.post('/new-product', upload.single('fprodfoto'), productController.crearProducto);

//actualizar productos
routes.get('/update-product/:id', productController.verActualizarProducto);
routes.put('/update-product', productController.enviarActualizarProducto);

//eliminar productos
routes.delete('/all-products/:id', productController.delete);

routes.delete('/product-cart/:id', productController.deleteCart);

routes.delete('/update-product/:id', productController.eliminarProducto);

module.exports = routes;