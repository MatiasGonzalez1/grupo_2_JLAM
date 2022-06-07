const express = require('express');
const routes = express.Router();


routes.use('/', require('./main.routes'));


module.exports = routes