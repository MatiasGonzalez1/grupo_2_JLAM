const path = require("path");
const fs = require("fs");
const {validationResult} = require('express-validator');
const db = require("../database/models");
const { Op } = require("sequelize");


const productController = {
    catalogo: (req, res) => {

        db.Product.findAll({
        })
        .then(productos =>{
            res.render(path.join(__dirname, "../views/products/catalogue.ejs"), {user: req.session.userLogged, productos: productos});
        })
        .catch(error => res.send(error))

    },
    filterCatalogue: (req, res) => {
        //tomo el dato que quiero filtrar
        let query = req.query;
        let where = {};

        if (query == undefined) {
            db.Product.findAll({
            })
            .then(productos =>{
                let response = {
                    meta: {
                        status: 200,
                        url: '/catalogue/filter'
                    },
                    data: productos
                   }
                   res.json(response)
            })
            .catch(error => res.send(error))
            
        }else{
            // si el usuario envia el type en el filtro
            if(query.type){
                const typeArray = query.type.split(",");
                const condition = {
                    idProductCategory: {
                        [Op.in]: typeArray
                    }
                }
                where = condition;
            }
    
            if(query.price){
                const condition = {
                    productPrice: {
                        [Op.lte]: query.price
                    }
                }
                if(query.type){
                    where[Op.and] = condition;
                }else{
                    where = condition;
                }
            }
    
            db.Product.findAll({
                include: [{association: 'category'}],  
                where: where
            })
            .then(productos =>{
                let response = {
                    meta: {
                        status: 200,
                        url: '/catalogue/filter'
                    },
                    data: productos
                   }
                   res.json(response)
            })
            .catch(error => res.send(error))
        }
    },
    searchProduct: (req, res) => {
        let searchQuery = req.query.searchValue;
        db.Product.findAll({  
            where: {
                [Op.or] :[
                    {productName: {
                        [Op.like]: '%' + searchQuery + '%'
                    }},
                    {productVariety: {
                        [Op.like]: '%' + searchQuery + '%'
                    }},
                    {'$category.productCategoryName$': {
                        [Op.like]: '%' + searchQuery + '%'
                    }}
                ]
            },
            include:{
                model: db.ProductCategory,
                as: 'category',
                required: true
            }
        })
        .then(productos =>{
            res.render(path.join(__dirname, "../views/products/catalogue.ejs"), {user: req.session.userLogged, productos: productos, searchQuery});
        })
        .catch(error => res.send(error))
        
    },

    cart: async(req, res) => {
        if (req.cookies.carrito != undefined){
            //asigno a una variable
            let carritoActual = JSON.parse(req.cookies.carrito);
            let total = 0;
            let carritoFinal= await Promise.all(carritoActual.map(async function(element){
                //busco el producto que tiene el mismo id que el de mi carrito

                let product = await db.Product.findOne( {where: {
                    idProduct : element.id
                }});
                total = total + Number(product.productPrice * element.quantity);
                //genero un objeto con los datos que necesito de mi producto
                let productData = {
                    quantity: element.quantity,
                    idProduct: product.idProduct,
                    productName: product.productName,                   
                    productImg: product.productImg,
                    productPrice: product.productPrice,
                }
                return productData; 
            }));
            res.render(path.join(__dirname, "../views/products/productCart.ejs"), {carritoFinal, user: req.session.userLogged, total});
        }else{
            res.render(path.join(__dirname, "../views/products/productCart.ejs"), {carritoFinal:[], user: req.session.userLogged, total:[]});
        }
    },

    addItem: (req, res) => {
        const idProducto = req.params.id;
        let cantidad = 0;
        //pregunto si existe re.body.cantidad
        if (req.body.cantidad) {
            cantidad = Number(req.body.cantidad);
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
                if (req.body.cantidad) {
                    existe.quantity = Number(req.body.cantidad);
                }else{
                    existe.quantity = cantidad + existe.quantity;
                }
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
        res.json({
            response:true
        });
    },
    updateFromCart: async(req, res) =>{
        const cantidad = req.body.quantity;
        const idProducto = req.params.id;
        let carritoActual = JSON.parse(req.cookies.carrito);
        let carritoActualizado;
        let productsId =[]; 
        let subtotal= 0;

        carritoActualizado = carritoActual.map(function(producto){
            if (producto.id == idProducto) {
                producto.quantity = cantidad;                
            }
            productsId.push(producto.id);
            return producto;
        })
        let prices = await db.Product.findAll({
            attributes: ['idProduct', 'productPrice'],
            where:{
                idProduct: {[Op.in]:productsId}
            },
        })

        prices.forEach(price =>{
            carritoActualizado.forEach(producto =>{
                if (price.idProduct == producto.id) {
                    subtotal = subtotal +Number(price.productPrice) * producto.quantity;
                }
            });
        });
        console.log(subtotal);

        res.cookie('carrito', JSON.stringify(carritoActualizado),{maxAge:21600000}); 
        res.json({
            response:true,
            subtotal: subtotal
        });

    },
    deleteCart: (req, res) =>{
        const idProducto = req.params.id;

        let carritoActual = JSON.parse(req.cookies.carrito);

        let carritoFilt = carritoActual.filter(producto => producto.id != idProducto);

        res.cookie('carrito', JSON.stringify(carritoFilt),{maxAge:21600000});

        res.redirect('/product/product-cart');
    },
    checkout: async (req, res) => {
        //toma el usuario segun la session
       let userData =  req.session.userLogged;
       //si existe la cookie carrito
       if (req.cookies.carrito != undefined && req.session.userLogged){
           //asigno a una variable
           let carritoActual = JSON.parse(req.cookies.carrito);
           let subtotal = 0;
           let city = await db.Cities.findAll({});
            const getProds = async(carritoActual) => {
                const carritoFinal = await Promise.all(carritoActual.map(async function(cartItem){
                    let producto = await db.Product.findOne({
                        where: {
                            idProduct: cartItem.id 
                        },
                    });
                    subtotal = subtotal + Number(producto.productPrice * cartItem.quantity);
                    let finalItem = { 
                        productName:producto.productName,
                        productImg:producto.productImg,
                        productPrice:producto.productPrice,
                        quantity: cartItem.quantity}
                    return finalItem; 
                }));
                return carritoFinal;
            }
            let carritoFinal = await getProds(carritoActual);
        
            res.render(path.join(__dirname, "../views/products/checkout.ejs"), {
                carritoFinal, user:userData, city, subtotal
            });
           
        }else{
            res.redirect('/');
        }
    },
    //pendiente a la tabla pivot
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

    newProduct: (req, res) => {
        db.ProductCategory.findAll({
        })
        .then(categories =>{
            res.render(path.join(__dirname, "../views/products/newProduct.ejs"), {userLog: req.session.userLogged, categories:categories});
        })
        .catch(error => res.send(error))
    },

    updateProduct: (req, res) =>{

        db.ProductCategory.findAll({
        })
        .then(categories =>{
            return categories;
        })
        .then((categories)=>{
            db.Product.findByPk(req.params.id, {
                include: [{association: 'category'}]
            })
            .then(coincidencia =>{
                res.render(path.join(__dirname, '../views/products/updateProduct.ejs'), {userLog: req.session.userLogged, coincidencia: coincidencia, categories:categories});
            })
        })
        .catch(error => res.send(error))
    },

    updateProductSubmit: (req, res) =>{
        let errors = validationResult(req);

            if(!errors.isEmpty()) {
                db.ProductCategory.findAll({
                })
                .then(categories =>{
                    return categories;
                })
                .then((categories)=>{
                    db.Product.findByPk(req.body.fid, {
                        include: [{association: 'category'}]
                    })
                    .then(coincidencia =>{
                        res.render(path.join(__dirname, '../views/products/updateProduct.ejs'), {userLog: req.session.userLogged, errors:errors.mapped(), coincidencia: coincidencia, categories:categories});
                    })
                })
                .catch(error => res.send(error))
            } else {

        
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
        .then(() =>{
            res.redirect('/product/all-products');
        })
        .catch(error => res.send(error))
    }
    },

    newProductSubmit: (req, res) =>{
        db.ProductCategory.findAll({   
        })
        .then(categories =>{
            let errors = validationResult(req);
    
            if(!errors.isEmpty()) {
                if (req.file) {
                    //lo borramos
                        fs.unlinkSync(path.join(__dirname, "../../public/img/productImg", req.file.filename));
                        };
                return res.render('./products/newProduct', {errors:errors.mapped(), old: req.body, userLog: req.session.userLogged, categories});
            } else {
                
            db.Product.create({
                productName: req.body.fnombre,
                idProductCategory: req.body.fcategoria,
                productHarvest: req.body.fcoseAnio,
                productVariety: req.body.fvariedad,
                productBreeding: req.body.fcrianza,
                productGuard: req.body.fguarda,
                productDescription: req.body.fnotacata,
                productImg: req.file.filename,
                productPrice: req.body.fprecio,
                productStock: req.body.fstock,
            })
            res.redirect('/product/all-products');
            }
        })
    },
    filterCategory: (req, res) =>{
        if(req.params.filter == 1){
            db.Product.findAll({
                include: [{association: 'category'}],
            })
            .then(productos =>{
                let response = {
                 meta: {
                     status: 200,
                     url: '/all-products/filter'
                 },
                 data: productos
                }
                res.json(response)
             })
        }else{
            db.Product.findAll({
                include: [{association: 'category'}],  
                where: {
                    idProductCategory: {
                      [Op.eq]: Number(req.params.filter)
                    }
                  }
            })
            .then(productos =>{
               let response = {
                meta: {
                    status: 200,
                    url: '/all-products/filter'
                },
                data: productos
               }
               res.json(response)
            })
        }

    },
    allProducts: (req, res) =>{

        db.Product.findAll({
            include: [{association: 'category'}],
        })
        .then(productos =>{
            res.render(path.join(__dirname, '../views/products/all-products.ejs'), {userLog: req.session.userLogged, productos: productos});
        })
        .catch(error => res.send(error))
       
    },

    delete: async (req, res) => {

        await db.Product.destroy({
            where: {idProduct: Number (req.params.id)} 
        })
        res.redirect('/product/all-products');
    },
        
};

module.exports = productController;
