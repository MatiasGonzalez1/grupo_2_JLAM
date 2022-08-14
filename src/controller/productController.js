const path = require("path");
const fs = require("fs");
const {validationResult} = require('express-validator');
const db = require("../database/models");
// const Product = db.Product;

let archivoProductos = fs.readFileSync(
    path.join(__dirname, "../models/data/products.json"),
    { encoding: "utf-8" }
);

let usersFile = fs.readFileSync(path.join(__dirname, '../models/data/users.json'), { encoding: 'utf-8' });

let users = JSON.parse(usersFile);
let productos = JSON.parse(archivoProductos);

let cityFile = fs.readFileSync(path.join(__dirname, '../models/data/city.json'), { encoding: 'utf-8' });
let city = JSON.parse(cityFile);

const productController = {
    catalogo: (req, res) => {
        db.Product.findAll({
        })
        .then(productos =>{
            res.render(path.join(__dirname, "../views/products/catalogue.ejs"), {user: req.session.userLogged, productos: productos});
        })
        .catch(error => res.send(error))
    },

    carrito: (req, res) => {
        if (req.cookies.carrito != undefined){
            //asigno a una variable
            let carritoActual = JSON.parse(req.cookies.carrito);

            let carritoFinal= carritoActual.map(function(element){
                //busco el producto que tiene el mismo id que el de mi carrito
                let producto = productos.find( producto => producto.id_producto == element.id );

                //genero un objeto con los datos que necesito de mi producto
                let productData = {
                    cantidad: element.quantity,
                    id_producto: producto.id_producto,
                    nombre_producto: producto.nombre_producto,                   
                    imagen_producto: producto.imagen_producto,
                    precio: producto.precio,
                }
                return productData; 
            });
            
            res.render(path.join(__dirname, "../views/products/productCart.ejs"), {carritoFinal:carritoFinal, user: req.session.userLogged});
    
        }else{
            res.render(path.join(__dirname, "../views/products/productCart.ejs"), {carritoFinal:[], user: req.session.userLogged});
        }
    },

    agregarCarrito: (req, res) => {
        //tomo el id
        const idProducto = req.params.id;
        let cantidad = 0;
        
        //pregunto si existe re.body.cantidad
        if (req.body.cantidad) {
            cantidad = cantidad + req.body.cantidad;
        }else{
            cantidad = 1;
        }
        
        //pregunto si existe la cookie
        if(req.cookies.carrito != undefined){
            //si existe guardo en una variable req.cookie.carrito
            let carritoActual = JSON.parse(req.cookies.carrito);

            //mapeo el array
            let existe = carritoActual.find(elemento =>{
                return elemento.id == idProducto;
            })

            if (existe) {
                existe.quantity = cantidad + existe.quantity;
                carritoActual = carritoActual.map(function(elemento){
                    //si el id conincide con el id que recibo
                    if (elemento.id == idProducto) {
                        return existe;
                    }else{
                        return elemento; 
                    }
                });
            }else{
                //tomo los datos que necesito de mi nuevo item
                let newProductData= {
                    id: idProducto,
                    quantity: cantidad
                }
                //los guardo en mi carrito
                carritoActual.push(newProductData);
            }
            res.cookie('carrito', JSON.stringify(carritoActual),{maxAge:21600000});
            
        }else{
            //else la creo y le asigno carrito
            let productData = {
                id: idProducto,
                quantity: cantidad
            };

            //convierto mi objeto a string para almacenarlo en la cookie
            res.cookie('carrito', JSON.stringify([productData]),{maxAge:21600000});
           
        }

        res.redirect('/product/product-cart');  
    },

    deleteCart: (req, res) =>{
        const idProducto = req.params.id;

        let carritoActual = JSON.parse(req.cookies.carrito);

        let carritoFilt = carritoActual.filter(producto => producto.id != idProducto);

        res.cookie('carrito', JSON.stringify(carritoFilt),{maxAge:21600000});

        res.redirect('/product/product-cart');
    },
    checkout: (req, res) => {

        //toma el usuario segun la session
        let userActual =  req.session.userLogged;

        //lo busca entre los usuarios registrados
        let UserData = users.find((user) => {
            return user.id == userActual.id;
        });

        //si existe la cookie carrito
        if (req.cookies.carrito != undefined){
            //asigno a una variable
            let carritoActual = JSON.parse(req.cookies.carrito);

            let carritoFinal= carritoActual.map(function(element){
                //busco el producto que tiene el mismo id que el de mi carrito
                let producto = productos.find( producto => producto.id_producto == element.id );

                //genero un objeto con los datos que necesito de mi producto
                let productData = {
                    cantidad: element.quantity,
                    id_producto: producto.id_producto,
                    nombre_producto: producto.nombre_producto,                   
                    imagen_producto: producto.imagen_producto,
                    precio: producto.precio,
                }
                return productData; 
            });
            
            //renderizo enviando el carrito, el usuario y las ciudades
            res.render(path.join(__dirname, "../views/products/checkout.ejs"), {
                carritoFinal:carritoFinal, user:UserData, city:city
            });
    
        }else{
            res.render(path.join(__dirname, "../views/products/checkout.ejs"), {
                carritoFinal:[], user:UserData
            });
        }
    },
    submitCheckout: (req, res) => {
        let purchaseFile = fs.readFileSync(
            path.join(__dirname, "../models/data/purchaseDetail.json"),
            { encoding: "utf-8" }
        );
        let purchases = JSON.parse(purchaseFile);


        let formDataPayment = {
            nombre: req.body.checkoutName,
            apellido: req.body.checkoutLastName,
            email: req.body.checkoutEmail,
            ciudad: req.body.city,
            direccion: req.body.checkoutAddress,
            piso: req.body.checkoutFloor,
        }

        purchases.push(formDataPayment);

        let purchasesUpdated = JSON.stringify(purchases);
        fs.writeFileSync(path.join(__dirname,'../models/data/purchaseDetail.json'), purchasesUpdated);

        res.redirect('/');

    },

    detalle: (req, res) => {

        db.Product.findByPk(req.params.id, {
            include: [{association: 'category'}]
        })
        .then(coincidencia =>{
            res.render(path.join(__dirname, '../views/products/productDetail.ejs'), {user: req.session.userLogged, coincidencia: coincidencia});
        })
        .catch(error => res.send(error))
    },

    nuevoProducto: (req, res) => {
        res.render(path.join(__dirname, "../views/products/newProduct.ejs"),{userLog: req.session.userLogged});
    },

    verActualizarProducto: (req, res) =>{
        
        db.Product.findByPk(req.params.id, {
            include: [{association: 'category'}]
        })
        .then(coincidencia =>{
            res.render(path.join(__dirname, '../views/products/updateProduct.ejs'), {userLog: req.session.userLogged, coincidencia: coincidencia});
        })
        .catch(error => res.send(error))

    },

    enviarActualizarProducto: (req, res) =>{
        let imgProduct = req.body.imgProduct;
        if (req.file) {
            imgProduct = req.file.filename;
        }
        
        db.Product.update({
            idProduct: req.body.fid,
            productName: req.body.fnombre,
            idProductCategory: req.body.fcategoria,
            productHarvest: req.body.fcoseAnio,
            productVariety: req.body.fvariedad,
            productBreeding: req.body.fcrianza,
            productGuard: req.body.fguarda,
            productDescription: req.body.fnotacata,
            productImg: imgProduct,
            productPrice: req.body.fprecio,
            productStock: req.body.fstock,
        },
        {
            where:{
                idProduct: req.body.fid
            }
        })
        .then(producto =>{
            res.redirect('/product/all-products');
        })
        .catch(error => res.send(error))

    },

    crearProducto: (req, res) =>{
        
        let errors = validationResult(req);

        if(!errors.isEmpty()) {
            if (req.file) {
                //lo borramos
                  fs.unlinkSync(path.join(__dirname, "../../public/img/productImg", req.file.filename));
                   };
            return res.render('./products/newProduct', {errors:errors.mapped(), old: req.body});
        } else {
            
        let generadorId;
        productos.length === 0? generadorId = productos.length : generadorId = (productos.at(-1).id_producto)+1;

        let newDataProduct = {
            id_producto: generadorId,
            nombre_producto: req.body.fnombre,
            categoria: req.body.fcategoria,
            anio_cosecha: req.body.fcoseAnio,
            variedad: req.body.fvariedad,
            crianza: req.body.fcrianza,
            potencial_guarda: req.body.fguarda,
            nota_cata: req.body.fnotacata,
            imagen_producto: req.file.filename,
            precio: Number(req.body.fprecio),
            stock: Number(req.body.fstock),
        }

        productos.push(newDataProduct);

        let productosJson = JSON.stringify(productos, null, 4);
        fs.writeFileSync(path.join(__dirname,'../models/data/products.json'), productosJson);
        res.redirect('/product/all-products');
     }
    },
    
    cargarProductos: (req, res) =>{

        db.Product.findAll({
            include: [{association: 'category'}]
        })
        .then(productos =>{
            res.render(path.join(__dirname, '../views/products/all-products.ejs'), {userLog: req.session.userLogged, productos: productos});
        })
        .catch(error => res.send(error))
    },

    delete: (req, res) => {
        let id = req.params.id;
        productos = productos.filter((producto) => producto.id_producto != id);
        
        fs.writeFileSync(
            path.join(__dirname, '../models/data/products.json'),
            JSON.stringify(productos)
        )
        res.render(path.join(__dirname,"../views/products/all-products.ejs"), {productos: productos, userLog: req.session.userLogged});
    },
        
};

module.exports = productController;
