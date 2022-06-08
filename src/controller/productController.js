const path = require('path');

const productController = {

    catalogo: (req, res) =>{
        res.render(path.join(__dirname, '../views/products/catalogue.ejs'))
    },

    carrito: (req, res) =>{
        res.render(path.join(__dirname, '../views/products/productCart.ejs'))
    },

    detalle: (req, res) =>{
        res.render(path.join(__dirname, '../views/products/productDetail.ejs'))
    },

    nuevoProducto: (req, res) =>{
        res.render(path.join(__dirname, '../views/products/newProduct.ejs'))
    },

    actualizarProducto: (req, res) =>{
        res.render(path.join(__dirname, '../views/products/updateProduct.ejs'))
    },


}

module.exports = productController;