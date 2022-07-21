const express = require('express');
const routes = express.Router();
const mainController = require('../controller/mainController');

routes.get('/', mainController.index);
routes.get('/blog/:id', mainController.blog);
routes.get('/contact', mainController.contacto);
routes.get('/all_blogs', mainController.allBlogs);
routes.get('/faq', mainController.faq);
routes.get('/terminos', mainController.terminos);





module.exports = routes;