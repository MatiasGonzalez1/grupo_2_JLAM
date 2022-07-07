const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { dirname } = require('path');

let usersFile = fs.readFileSync(path.join(__dirname, '../models/data/users.json'), { encoding: 'utf-8' });
let users = JSON.parse(usersFile);

const usersController = {

    login: (req, res) =>{
        res.render(path.join(__dirname, '../views/users/login.ejs'))
    },

    processLogin: (req, res) =>{
       
        //comparo el usuario con mi base de datos
        let userMatch = users.find((user) => { 
            return user.email === req.body.email && bcrypt.compareSync(req.body.password, user.password);
        });

        // si el usuario existe, de lo contrario lo redirecciono con un mensaje de error
        if(userMatch){
            if (userMatch.permisos == 'admin') {
                req.session.isAdmin = true;
            }
            req.session.userLogged = userMatch;

            //si esta tildado el checkbox recordame //si no esta tildado viene como undefined
            if(req.body.recordarme != undefined) {
                res.cookie('recordarme', userMatch.email, { maxAge: 60000 })
             }
             
            /*//para eliminar cookie al hacer logout
            logout: (req, res) => {
                res.clearCookie('userEmail');
                req.session.destroy();
                return res.redirect('/');
            }*/
            res.redirect('/')
            }else{
                console.log("hola")
            res.render(path.join(__dirname, '../views/users/login.ejs'), {errors: [
                {msg: 'Datos Incorrectos'}
            ]});
            
        }
    },
    admin: (req, res) =>{
        res.render(path.join(__dirname, '../views/adminArea.ejs'))
    },
    registerView: (req, res)=>{
        res.render(path.join(__dirname, '../views/users/registro.ejs'))
    },
    register: (req,res) =>{

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
    },

    userData: (req, res) =>{
        const updateId =  Number(req.params.id);

        let coincidencia = users.find((user) => {
            return user.id === updateId;
        });

        res.render(path.join(__dirname, '../views/products/' //aca va la vista
    ), { coincidencia: coincidencia });
    },

    userEdit: (req, res) =>{

        const userId = Number(req.body.id);

        let userFilter = usuarios.filter((usuario) => {
            return usuario.id !== userId;
        });

        let formDataUser = {
            id: updateId,
            nombre: req.body.nombre,
            email: req.body.email,
            fechaNac: req.body.fechaNacimiento,
            password: bcrypt.hashSync(req.body.password, 10), // Encriptacion de password
            profileImg: req.file.filename,
        }

        userFilter.push(formDataUser);

        let newDataUsers = JSON.stringify(users, null, 4);
        fs.writeFileSync(path.join(__dirname,'../models/data/users.json'), newDataUsers); 
    }, 
    cargarUsuarios: (req, res) =>{

        res.render(path.join(__dirname, '../views/users/all-users.ejs'), { users: users });
    },


}

module.exports = usersController;