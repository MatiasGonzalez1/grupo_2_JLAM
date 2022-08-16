const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const db = require("../database/models");

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
        res.render(path.join(__dirname, '../views/adminArea.ejs'), {userLog: req.session.userLogged});
    },
    registerView: (req, res)=>{
        res.render(path.join(__dirname, '../views/users/registro.ejs'))
    },
    register: (req,res) =>{

        let errors = validationResult(req);

        
        if(!errors.isEmpty()){
        // si existe un archivo con propiedad filename
        if (req.file) {
      //lo borramos
        fs.unlinkSync(path.join(__dirname, "../../public/img/profileImages", req.file.filename));
         }
         res.render('./users/registro', {errors:errors.mapped(), old: req.body});
        } else{
     
        //Asigno datos del body al objeto a insertar a la base de datos    
        db.Users.create({
            firstName: req.body.nombre,
            lastName: req.body.apellido,
            userEmail: req.body.email,
            idUserCategory: 2,
            userBirthDate: req.body.fechaNacimiento,
            userPassword: bcrypt.hashSync(req.body.password, 10),
            userImg: req.file.filename,
            idCity: null,
            userAddress: null,
            userFloor: null
        })

        //Redireccion al login luego del registro
        res.redirect('/users/login')

        }
    },

    userData: (req, res) =>{
        let userActual =  req.session.userLogged;
        let userData = db.Users.findByPk(userActual.id,{
        })
        let cities = db.Cities.findAll({
        })
        Promise.all ([userData, cities]) 
          .then(([userData, cities]) => {
           
            res.render(path.join(__dirname, '../views/users/edit-user'), {userData, cities, user:req.session.userLogged });
          })
          .catch(error => res.send(error))
    },

    userEdit: (req, res) =>{
        let errors = validationResult(req);

        if(!errors.isEmpty()){
           
            // // si existe un archivo con propiedad filename
            if (req.file) {
            //     //lo borramos 
            fs.unlinkSync(path.join(__dirname, "../../public/img/profileImages", req.file.filename));
        }
        res.render(path.join(__dirname,'../views/users/edit-user'), {user: userActual, errors:errors.mapped()});

        }

        let userData = {
            userId: req.body.id,
            firstName: req.body.nombre,
            lastName: req.body.apellido,
            userEmail: req.body.email,
            userBirthDate: req.body.fechaNacimiento,
            userPassword: req.body.password,
            userImg: req.body.profileImageUser,
            idCity: req.body.codigoPostal,
            userAddress: req.body.direccion,
            userFloor: req.body.departamento,
        }
        //si hay una pass nueva la cambio
        if(req.body.password.length > 0){
            userData.userPassword = bcrypt.hashSync(req.body.password, 10);
        }else{
            delete userData.userPassword;
        }
        // si agrego direccion
        if(req.body.direccion != undefined && req.body.direccion.length > 1){
            userData.userAddress= req.body.direccion;
        }else{
            delete userData.userAddress;
        }
        if(req.body.departamento != undefined && req.body.departamento.length > 0){
            userData.userFloor = req.body.departamento;
        }else{
            delete userData.userFloor;
        }
        //si hay una imagen la cambio
        if(req.file){
            fs.unlinkSync(path.join(__dirname, "../../public/img/profileImages", user.profileImg));
            userData.userImg = req.file.filename;
        }else{
            delete userData.userImg;
        }
        console.log(userData);

        db.Users.update(userData,
        {
            where:{
                userId: Number(req.body.id)
            }
        })
        .then((result) =>{
            console.log(result);
            res.redirect('/');
        })
        .catch(error => res.send(error))
   
    },
    userPermissions:(req, res) =>{
        let user = db.Users.findByPk(Number(req.params.id),{
            include: [{association: 'userCategory'}]
        })
        let categories = db.userCategory.findAll({
        })
        Promise.all ([user, categories]) 
          .then(([user, categories]) => {
           
            res.render(path.join(__dirname, '../views/users/edit-permissions.ejs'), {user, categories, userLog: req.session.userLogged });
          })
          .catch(error => res.send(error))
    },
    permissionsProcess:(req, res) =>{
        
        db.Users.update({
            idUserCategory:req.body.permisos,
        },
        {
            where:{
                userId: req.body.id
            }
        })
        .then(() =>{
            res.redirect('/users/all-users');
        })
        .catch(error => res.send(error))
    },
    cargarUsuarios: (req, res) =>{

        let users = db.Users.findAll({
            include: [{association: 'userCategory'}]
        })
        let categories = db.userCategory.findAll({
        })
        Promise.all ([users, categories]) 
          .then(([users, categories]) => {
           
            res.render(path.join(__dirname, '../views/users/all-users.ejs'), {users, categories, userLog: req.session.userLogged });
          })
          .catch(error => res.send(error))
        
    },

    
    

}

module.exports = usersController;