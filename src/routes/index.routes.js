const express = require('express');
const routes = express.Router();


routes.use('/', require('./main.routes'));
routes.use('/product', require('./product.routes'));
routes.use('/users', require('./users.routes'));
routes.use('/content', require('./content.routes'));



module.exports = routes