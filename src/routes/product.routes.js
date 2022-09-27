const express = require('express');
const routes = express.Router();
const productController = require('../controller/productController');
const upload = require('../middleware/multerMidProducts')
const adminMid = require('../middleware/adminMiddleware');
const authMid = require('../middleware/authMiddleware');
const validationPro = require('../middleware/productMidValidator');
const validUpdateProduct = require('../middleware/updateProductMidValidator');
const checkoutData = require('../middleware/checkoutDataMidValidator');



routes.get('/catalogue', productController.catalogo);
routes.get('/catalogue/filter', productController.filterCatalogue);
routes.get('/busqueda', productController.searchProduct);
routes.get('/product-detail/:id', productController.detalle);

//carrito de compras
routes.get('/product-cart', productController.cart);
routes.post('/product-cart/:id', productController.addItem);
routes.post('/update-cart/:id', productController.updateFromCart);

//checkout
routes.get('/checkout', [authMid] ,productController.checkout);
routes.post('/checkout', [authMid,checkoutData], productController.submitCheckout);

//cargar productos
routes.get('/all-products/', [adminMid], productController.allProducts);

//filtrar productos
routes.get('/all-products/:filter', [adminMid], productController.filterCategory);

// nuevo producto
routes.get('/new-product', [adminMid], productController.newProduct);
routes.post('/new-product', [upload, adminMid], validationPro, productController.newProductSubmit);

//actualizar productos
routes.get('/update-product/:id', [adminMid], productController.updateProduct);
routes.put('/update-product', [adminMid, upload], validUpdateProduct, productController.updateProductSubmit);

//eliminar productos
routes.delete('/all-products/:id', [adminMid], productController.delete);


//eliminar item de mi carrito de compras
routes.delete('/product-cart/:id', productController.deleteCart);

module.exports = routes;