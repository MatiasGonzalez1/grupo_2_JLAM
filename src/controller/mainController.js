const path = require('path');
const fs = require('fs');
const session = require('express-session');

let newsjson = fs.readFileSync(
    path.join(__dirname, "../models/data/newsBlog.json"),
    { encoding: "utf-8" }
);
let archivoProductos = fs.readFileSync(
    path.join(__dirname, "../models/data/products.json"),
    { encoding: "utf-8" }
);

let news = JSON.parse(newsjson);
let productos = JSON.parse(archivoProductos);

const mainController = {

    index: (req,res) =>{
        
        let selecciones = productos.slice(-4);
        res.render(path.join(__dirname, '../views/index.ejs'),{selecciones:selecciones, news:news, user:req.session.userLogged})
    },

    blog: (req,res) =>{

        const detalleId = Number(req.params.id); //convierto el id string a un numero para poder hacer la triple comparacion

        let newsMatch = news.find((news) => {
            //filtro mis productos y busco el id
            return news.id_novedades === detalleId;
        });

        res.render(path.join(__dirname, '../views/blog_prueba.ejs'),{newsMatch, user: req.session.userLogged})
    },

    contacto: (req,res) =>{
        res.render(path.join(__dirname, '../views/contact.ejs'))
    },

    allBlogs: (req,res) =>{
        
        res.render(path.join(__dirname, '../views/allBlogs.ejs'),{news:news, user: req.session.userLogged})
    },
    faq: (req,res) =>{
        res.render(path.join(__dirname, '../views/faq.ejs'), {user: req.session.userLogged});
    },

    terminos: (req, res) =>{
        res.render(path.join(__dirname, '../views/terminos.ejs'),{user: req.session.userLogged})
    }
};

module.exports = mainController;

