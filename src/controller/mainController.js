const path = require('path');
const fs = require('fs')

let newsjson = fs.readFileSync(
    path.join(__dirname, "../models/data/newsBlog.json"),
    { encoding: "utf-8" }
);
let news = JSON.parse(newsjson);

const mainController = {

    index: (req,res) =>{
        res.render(path.join(__dirname, '../views/index.ejs'),{news:news})
    },

    blog: (req,res) =>{

        const detalleId = Number(req.params.id); //convierto el id string a un numero para poder hacer la triple comparacion

        let newsMatch = news.find((news) => {
            //filtro mis productos y busco el id
            return news.id_novedades === detalleId;
        });

        res.render(path.join(__dirname, '../views/blog_prueba.ejs'),{newsMatch})
    },

    contacto: (req,res) =>{
        res.render(path.join(__dirname, '../views/contact.ejs'))
    },

    allBlogs: (req,res) =>{
        
        res.render(path.join(__dirname, '../views/allBlogs.ejs'),{news:news})
    }


};

module.exports = mainController;

