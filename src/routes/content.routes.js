const express = require('express');
const routes = express.Router();
const mainController = require('../controller/mainController');

routes.get('/', mainController.index);
routes.get('/blog', mainController.blog);
routes.get('/contact', mainController.contacto);
routes.get('/all_blogs', mainController.allBlogs);



module.exports = routes;