const path = require('path');
const fs = require('fs');

let archivoProductos = fs.readFileSync(path.join(__dirname, '../models/data/products.json'), { encoding: 'utf-8' });
let productos = JSON.parse(archivoProductos);

const productController = {

    catalogo: (req, res) =>{
        res.render(path.join(__dirname, '../views/products/catalogue.ejs'), { productos: productos })
    },

    carrito: (req, res) =>{
        res.render(path.join(__dirname, '../views/products/productCart.ejs'))
    },

    detalle: (req, res) => {
        const detalleId = Number(req.params.id); //convierto el id string a un numero para poder hacer la triple comparacion
    
        let coincidencia = productos.find((producto) => { //filtro mis productos y busco el id
            return producto.id_producto === detalleId;
        });
        console.log(coincidencia);
        res.render(path.join(__dirname, '../views/products/productDetail.ejs'), { coincidencia: coincidencia });
    },

    nuevoProducto: (req, res) =>{
        res.render(path.join(__dirname, '../views/products/newProduct.ejs'))
    },

    actualizarProducto: (req, res) =>{
        res.render(path.join(__dirname, '../views/products/updateProduct.ejs'))
    },

    cargarProductos: (req, res) =>{
        let archivoProductos = fs.readFileSync(path.join(__dirname, '../models/data/products.json'), { encoding: 'utf-8' });
        let productos = JSON.parse(archivoProductos);
        console.log(productos);
        res.render(path.join(__dirname, '../views/adminArea.ejs'), { productos: productos });
    },

}

module.exports = productController;