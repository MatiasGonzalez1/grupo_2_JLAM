const path = require("path");
const fs = require("fs");

let archivoProductos = fs.readFileSync(
    path.join(__dirname, "../models/data/products.json"),
    { encoding: "utf-8" }
);
let archivoCart = fs.readFileSync(
    path.join(__dirname, "../models/data/productOnCart.json"),
    { encoding: "utf-8" }
);
let productos = JSON.parse(archivoProductos);
let productOnCart = JSON.parse(archivoCart);

const productController = {
    catalogo: (req, res) => {
        res.render(path.join(__dirname, "../views/products/catalogue.ejs"), {
            productos: productos,
        });
    },

    carrito: (req, res) => {
        if (req.params.id == null) {
            res.render(path.join(__dirname, "../views/products/productCart.ejs"), {
                productOnCart: productOnCart,
            });
        } else {
            let detalleId = Number(req.params.id);

            let coincidencia = productos.find((producto) => {
                //filtro mis productos y busco el id
                return producto.id_producto === detalleId;
            });

            productOnCart.push(coincidencia);

            
            fs.writeFileSync(
                path.join(__dirname, "../models/data/productOnCart.json"),
                JSON.stringify(productOnCart)
            );

            res.render(path.join(__dirname, "../views/products/productCart.ejs"), {productOnCart: productOnCart});
        }
    },

    deleteCart: (req, res) =>{
        let id = req.params.id;
        productOnCart = productOnCart.filter((producto) => producto.id_producto != id);
        
        fs.writeFileSync(
            path.join(__dirname, '../models/data/productOnCart.json'),
            JSON.stringify(productOnCart)
        )
        res.render(path.join(__dirname, "../views/products/productCart.ejs"), {productOnCart: productOnCart});
    },

    detalle: (req, res) => {
        const detalleId = Number(req.params.id); //convierto el id string a un numero para poder hacer la triple comparacion

        let coincidencia = productos.find((producto) => {
            //filtro mis productos y busco el id
            return producto.id_producto === detalleId;
        });

        res.render(path.join(__dirname, '../views/products/productDetail.ejs'), { coincidencia: coincidencia });
    },

    nuevoProducto: (req, res) => {
        res.render(path.join(__dirname, "../views/products/newProduct.ejs"));
    },

    verActualizarProducto: (req, res) =>{
        const updateId =  Number(req.params.id);

        let coincidencia = productos.find((producto) => { //filtro mis productos y busco el id
            return producto.id_producto === updateId;
        });

        res.render(path.join(__dirname, '../views/products/updateProduct.ejs'), { coincidencia: coincidencia });
    },

    enviarActualizarProducto: (req, res) =>{
        const idProducto = Number(req.body.fid);

        let productosFilter = productos.filter((producto) => {
            return producto.id_producto !== idProducto;
        });

        let formDataProduct = {
            id_producto: idProducto,
            nombre_producto: req.body.fnombre,
            categoria: req.body.fcategoria,
            anio_cosecha: req.body.fcoseAnio,
            variedad: req.body.fvariedad,
            crianza: req.body.fcrianza,
            potencial_guarda: req.body.fguarda,
            nota_cata: req.body.fnotacata,
            imagen_producto: req.body.fprodfoto,
            precio: req.body.fprecio,
            stock: req.body.fstock,
        }

        productosFilter.push(formDataProduct);

        let productosJson = JSON.stringify(productosFilter);
        fs.writeFileSync(path.join(__dirname,'../models/data/products.json'), productosJson);

        res.redirect('/product/all-products');
    },

    cargarProductos: (req, res) =>{
        res.render(path.join(__dirname, '../views/products/all-products.ejs'), { productos: productos });
    },
};

module.exports = productController;
