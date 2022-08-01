const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');

let usersFile = fs.readFileSync(path.join(__dirname, '../models/data/users.json'), { encoding: 'utf-8' });
let users = JSON.parse(usersFile);
let cityFile = fs.readFileSync(path.join(__dirname, '../models/data/city.json'), { encoding: 'utf-8' });
let city = JSON.parse(cityFile);

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
        ), {user: UserData, city:city});
    },

    userEdit: (req, res) =>{
        let userId = Number(req.body.id);
        let userActual =  req.session.userLogged;

        let errors = validationResult(req);

        if(!errors.isEmpty()){
           
            // // si existe un archivo con propiedad filename
            if (req.file) {
            //     //lo borramos 
            fs.unlinkSync(path.join(__dirname, "../../public/img/profileImages", req.file.filename));
        }
        res.render(path.join(__dirname,'../views/users/edit-user'), {user: userActual, errors:errors.mapped()});

        } else{
            let updateUsers= users.map(function(user){
                //busco el producto que tiene el mismo id
                
                if (user.id == userId) { 
                    // si file vino con algo
                    let formDataUser = {
                        id: userId,
                        permisos:user.permisos,
                        nombre: req.body.nombre,
                        apellido:req.body.apellido,
                        email: req.body.email,
                        fechaNac: req.body.fechaNacimiento,
                        direccion: user.direccion,
                        departamento:user.departamento,
                        codigoPostal:user.codigoPostal,
                        password: user.password,
                        profileImg: user.profileImg,
                    }
                    //si hay una pass nueva la cambio
                    if(req.body.password == ''){
                        formDataUser.password = user.password;
                    }else{
                        formDataUser.password = bcrypt.hashSync(req.body.password, 10);
                    }
                    //si agrego direccion
                    if(req.body.direccion != undefined && req.body.direccion.length > 1){
                        formDataUser.direccion = req.body.direccion;
                    }
                    if(req.body.departamento != undefined && req.body.departamento.length > 1){
                        formDataUser.departamento = req.body.departamento;
                    }
                     //si agrego ciudad o la cambio 
                    if(req.body.codigoPostal != undefined){
                         //busco la ciudad que coincida y le asigno el nombre de la misma
                        let Usercity = city.find((code) => {
                            return code.nombre == req.body.codigoPostal;
                        });
                        formDataUser.codigoPostal = Usercity.codigo;
                    }

                    //si hay una imagen la cambio
                    if(req.file){
                        fs.unlinkSync(path.join(__dirname, "../../public/img/profileImages", user.profileImg));
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
    userPermissions:(req, res) =>{
        let userId = Number(req.params.id); 

        let UserData = users.find((user) => {
            return user.id == userId;
        });
        res.render(path.join(__dirname, '../views/users/edit-permissions.ejs'), { user: UserData, userLog: req.session.userLogged });
    },
    permissionsProcess:(req, res) =>{
        let userId = Number(req.body.id);

        let updateUsers= users.map(function(user){
            if (user.id == userId) {
               let formDataUser = {
                        id: userId,
                        permisos:user.permisos,
                        nombre: user.nombre,
                        email: user.email,
                        fechaNac: user.fechaNac,
                        password: user.password,
                        profileImg: user.profileImg,
                }

                if(req.body.permisos != user.permisos && !req.body.permisos == ''){
                    formDataUser.permisos = req.body.permisos;
                }
                return formDataUser;
            }else{
                return user;
            }

            
        });

        let newDataUsers = JSON.stringify(updateUsers, null, 4);
        fs.writeFileSync(path.join(__dirname,'../models/data/users.json'), newDataUsers);

        res.redirect('/users/all-users');
    },
    cargarUsuarios: (req, res) =>{

        //obligo a la vista a leer el json y tomar todos los datos actualizados antes de renderizar
        let usersFile = fs.readFileSync(path.join(__dirname, '../models/data/users.json'), { encoding: 'utf-8' });
        let users = JSON.parse(usersFile);

        res.render(path.join(__dirname, '../views/users/all-users.ejs'), { users: users, userLog: req.session.userLogged });
    }

}

module.exports = usersController;