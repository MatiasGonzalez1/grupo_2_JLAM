const express = require('express');
const routes = express.Router();
const usersController = require('../controller/usersController');
const path = require ('path');
const multer = require ('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/profileImages');
    },

    //criterio de nombramiento de imagen segun email
    filename: (req, file, cb) => {
        cb(null, req.body.email + '_' + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage});

routes.get('/login', usersController.login);
routes.post('/register', upload.single('profileImage'), usersController.register)
routes.get('/admin', usersController.admin);





module.exports = routes;