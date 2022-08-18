const express = require('express');
const routes = express.Router();
const productController = require('../controller/productController');
const upload = require('../middleware/multerMidProducts')
const adminMid = require('../middleware/adminMiddleware');
const authMid = require('../middleware/authMiddleware');
const validationPro = require('../middleware/productMidValidator');
const checkoutData = require('../middleware/checkoutDataMidValidator');



routes.get('/catalogue', productController.catalogo);
routes.get('/product-detail/:id', productController.detalle);

//carrito de compras
routes.get('/product-cart', productController.carrito);
routes.post('/product-cart/:id', productController.agregarCarrito);

//checkout
routes.get('/checkout', [authMid] ,productController.checkout);
routes.post('/checkout', [authMid,checkoutData], productController.submitCheckout);

//cargar productos
routes.get('/all-products/:id?', [adminMid], productController.cargarProductos);

// nuevo producto
routes.get('/new-product', [adminMid], productController.nuevoProducto);
routes.post('/new-product', [upload, adminMid], validationPro, productController.crearProducto);

//actualizar productos
routes.get('/update-product/:id', [adminMid], productController.verActualizarProducto);
routes.put('/update-product', [adminMid, upload], productController.enviarActualizarProducto);

//eliminar productos
routes.delete('/all-products/:id', [adminMid], productController.delete);


//eliminar item de mi carrito de compras
routes.delete('/product-cart/:id', productController.deleteCart);

module.exports = routes;