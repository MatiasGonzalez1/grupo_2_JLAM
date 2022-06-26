const path = require('path');
const fs = require('fs')

let newsjson = fs.readFileSync(
    path.join(__dirname, "../models/data/newsBlog.json"),
    { encoding: "utf-8" }
);
let news = JSON.parse(newsjson);

const mainController = {

    index: (req,res) =>{
        res.render(path.join(__dirname, '../views/index.ejs'))
    },

    blog: (req,res) =>{
        res.render(path.join(__dirname, '../views/blog.ejs'))
    },

    contacto: (req,res) =>{
        res.render(path.join(__dirname, '../views/contact.ejs'))
    },

    allBlogs: (req,res) =>{
        
        res.render(path.join(__dirname, '../views/allBlogs.ejs'),{news:news})
    }


};

module.exports = mainController;

