const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

let archivoUsuarios = fs.readFileSync(path.join(__dirname, '../models/data/users.json'), { encoding: 'utf-8' });
let usuarios = JSON.parse(archivoUsuarios);

const usersController = {

    login: (req, res) =>{
        res.render(path.join(__dirname, '../views/users/login.ejs'))
    },

    admin: (req, res) =>{
        res.render(path.join(__dirname, '../views/adminArea.ejs'))
    },

    register: (req,res) =>{

        //genero una id segun tamaño de array
        let generadorId;
        usuarios.length === 0? generadorId = usuarios.length : generadorId = (usuarios.at(-1).id)+1
        
        //Asigno datos del body al objeto a insertar a la base de datos    
        let formDataUser = {
            id: generadorId,
            categoria: "user",
            nombre: req.body.nombre,
            email: req.body.email,
            fechaNac: req.body.fechaNacimiento,
            password: bcrypt.hashSync(req.body.password, 10), // Encriptacion de password
            rePassword:req.body.repassword,
            profileImg: req.file.filename,
        }

        //Isercion de objeto a la base de datos
        delete formDataUser.rePassword
        usuarios.push(formDataUser);
        let newDataUsers = JSON.stringify(usuarios, null, 4);
        fs.writeFileSync(path.join(__dirname,'../models/data/users.json'), newDataUsers);

        //Redireccion al login luego del registro
        res.redirect('/users/login')
    },


}

module.exports = usersController;