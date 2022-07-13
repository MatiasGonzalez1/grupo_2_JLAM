const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { dirname } = require('path');
const {validationResult} = require('express-validator');

let usersFile = fs.readFileSync(path.join(__dirname, '../models/data/users.json'), { encoding: 'utf-8' });
let users = JSON.parse(usersFile);

const usersController = {

    login: (req, res) =>{
        res.render(path.join(__dirname, '../views/users/login.ejs'))
    },

    processLogin: (req, res) =>{

        let errors = validationResult(req);

        if(!errors.isEmpty()){
         res.render('./users/login', {errors:errors.mapped(), old: req.body});
        } else{
       
        //comparo el usuario con mi base de datos
        let userMatch = users.find((user) => { 
            return user.email === req.body.email && bcrypt.compareSync(req.body.password, user.password);
        });

        // si el usuario existe, de lo contrario lo redirecciono con un mensaje de error
        if(userMatch){
            if (userMatch.permisos == 'admin') {
                req.session.isAdmin = true;
            }
            //delete userMatch.password;
            req.session.userLogged = userMatch;


            //si esta tildado el checkbox recordame //si no esta tildado viene como undefined
            if(req.body.recordarme != undefined) {
                res.cookie('recordarme', userMatch.email, { maxAge: 3600000 })
             }
             
            res.redirect('/')
            }else{
                res.render(path.join(__dirname, '../views/users/login.ejs'), {errors: [
                {msg: 'Datos Incorrectos'}
            ]});
        
        }
    }
    },
    //para eliminar cookie al hacer logout
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },
    admin: (req, res) =>{
        res.render(path.join(__dirname, '../views/adminArea.ejs'))
    },
    registerView: (req, res)=>{
        res.render(path.join(__dirname, '../views/users/registro.ejs'))
    },
    register: (req,res) =>{

        let errors = validationResult(req);

        
        if(!errors.isEmpty()){
         res.render('./users/registro', {errors:errors.mapped(), old: req.body});
        } else{

             //genero una id segun tamaño de array
        let generadorId;
        users.length === 0? generadorId = users.length : generadorId = (users.at(-1).id)+1
        
        //Asigno datos del body al objeto a insertar a la base de datos    
        let formDataUser = {
            id: generadorId,
            permisos: 'user',
            nombre: req.body.nombre,
            email: req.body.email,
            fechaNac: req.body.fechaNacimiento,
            password: bcrypt.hashSync(req.body.password, 10), // Encriptacion de password
            profileImg: req.file.filename,
        }

        //Isercion de objeto a la base de datos
        users.push(formDataUser);
        let newDataUsers = JSON.stringify(users, null, 4);
        fs.writeFileSync(path.join(__dirname,'../models/data/users.json'), newDataUsers);

        //Redireccion al login luego del registro
        res.redirect('/users/login')

        }
    },

    userData: (req, res) =>{
        let userActual =  req.session.userLogged;

        let UserData = users.find((user) => {
            return user.id == userActual.id;
        });

        res.render(path.join(__dirname, '../views/users/edit-user' 
        ), {user: UserData});
    },

    userEdit: (req, res) =>{
        let userId = Number(req.body.id);
        let userActual =  req.session.userLogged;

        let errors = validationResult(req);

        if(!errors.isEmpty()){
        //    console.log(req.file);
        //     // si existe un archivo con propiedad filename
        //     if (!req.file.filename == undefined) {
        //         //lo borramos 
        //         fs.unlinkSync(path.join(__dirname, "../../public/img/profileImages", req.file.filename));
        //     };
        res.render(path.join(__dirname,'../views/users/edit-user'), {user: userActual, errors:errors.mapped()});

        } else{
            let updateUsers= users.map(function(user){
                //busco el producto que tiene el mismo id que el de mi carrito
                if (user.id == userId) { 
                    // si file vino con algo
                    let formDataUser = {
                        id: userId,
                        nombre: req.body.nombre,
                        email: req.body.email,
                        fechaNac: req.body.fechaNacimiento,
            
            
                        password: user.password,
                        profileImg: user.profileImg,
                    }
                    //si hay una pass nueva la cambio
                    if(req.body.password){
                        formDataUser.password = bcrypt.hashSync(req.body.password, 10);
                    }
                    //si hay una imagen la cambio
                    if(!req.file == undefined){
                        formDataUser.profileImg = req.file.filename;
                    }
                    return formDataUser;
                }else{
                    return user;
                }
            });
        
            let newDataUsers = JSON.stringify(updateUsers, null, 4);
            fs.writeFileSync(path.join(__dirname,'../models/data/users.json'), newDataUsers);

            res.redirect('/');
        };
        
    }, 
    cargarUsuarios: (req, res) =>{

        res.render(path.join(__dirname, '../views/users/all-users.ejs'), { users: users, user: req.session.userLogged });
    }


}

module.exports = usersController;