const path = require('path');

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


};

module.exports = mainController;

