const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const db = require("../database/models");


const usersController = {
    login: (req, res) =>{
        res.render(path.join(__dirname, '../views/users/login.ejs'))
    },

    processLogin: async (req, res) =>{

        let errors = validationResult(req);

        if(!errors.isEmpty()){
         res.render('./users/login', {errors:errors.mapped(), old: req.body});
        } else{
       
            
        let userMatch = await db.Users.findOne({
            
                where: {userEmail: req.body.email}
        });

        let secure = await bcrypt.compare(req.body.password, userMatch.userPassword)

        if(userMatch && secure ){
            
            userMatch.idUserCategory == 1? req.session.isAdmin = true : undefined
            
            req.session.userLogged = userMatch;

            if(req.body.recordarme != undefined) {
            res.cookie('recordarme', userMatch.userEmail, { maxAge: 3600000 })
            }
            res.redirect('/')
        }else{
            res.render(path.join(__dirname, '../views/users/login.ejs'), {errors: [
            {msg: 'Datos Incorrectos'}
            
        ]})
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
    getShippingCost:async(req, res) =>{

        let currentCity = await db.Cities.findByPk(Number(req.params.id),{
        })
        return res.json(currentCity);
        // console.log(res.json(currentCity), currentCity);
        
    },
    registerView: (req, res)=>{
        res.render(path.join(__dirname, '../views/users/registro.ejs'))
    },
    register: async (req,res) =>{

        let errors = validationResult(req);
        if(!errors.isEmpty()){
        // si existe un archivo con propiedad filename
        if (req.file) {
      //lo borramos
        fs.unlinkSync(path.join(__dirname, "../../public/img/profileImages", req.file.filename));
         }
         return res.json({errors:errors});

        //  res.render('./users/registro', {errors:errors.mapped(), old: req.body});
        } else{

        let pass = await bcrypt.hash(req.body.password, 10);

        //Asigno datos del body al objeto a insertar a la base de datos    
        await db.Users.create({
        firstName: req.body.nombre,
        lastName: req.body.apellido,
        userEmail: req.body.email,
        idUserCategory: 2,
        userBirthDate: req.body.fechaNacimiento,
        userPassword: pass,
        userImg: req.file.filename,
        idCity: null,
        userAddress: null,
        userFloor: null
        })
        .then(() =>{
            return res.json(response)
        })
        .catch(error => res.send(error))

        }
    },
    userData: async (req, res) =>{
        let userData = await db.Users.findByPk(Number( req.session.userLogged.userId),{
            include: [{association: 'city'}]
        })
        let cities = await db.Cities.findAll({
        })
        res.render(path.join(__dirname, '../views/users/edit-user'), {userData, cities, user:req.session.userLogged });
    },

    userEdit: (req, res) =>{
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            // // si existe un archivo con propiedad filename
            if (req.file) {
            //     //lo borramos 
            fs.unlinkSync(path.join(__dirname, "../../public/img/profileImages", req.file.filename));
        }
        return res.json({errors});
        
        }else{
            let userData = {
                firstName: req.body.nombre,
                lastName: req.body.apellido,
                userEmail: req.body.email,
                userBirthDate: req.body.fechaNacimiento,
                userPassword: req.body.password,
                idCity: req.body.codigoPostal ? req.body.codigoPostal : null,
                userAddress: req.body.direccion ? req.body.direccion : null,
                userFloor: req.body.departamento ? req.body.departamento : null,
            }
            //si hay una pass nueva la cambio
            if(req.body.password != undefined){
                userData.userPassword = bcrypt.hashSync(req.body.password, 10);
            }else{
                delete userData.userPassword;
            }

            //si hay una imagen la cambio
            if(req.file){
                fs.unlinkSync(path.join(__dirname, "../../public/img/profileImages", req.session.userLogged.userImg));
                userData.userImg = req.file.filename;
            }
            db.Users.update(userData,
            {
                where:{
                    userId: Number(req.body.id)
                }
            })
            .then((response) =>{
                return res.json(response)
            })
            .catch(error => res.send(error))
        }
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
    delete: async (req, res) => {
        
        await db.Users.destroy({
            where: {userId: Number (req.params.id)} 
        })
        res.redirect('/users/all-users');
    },

    
    

}

module.exports = usersController;