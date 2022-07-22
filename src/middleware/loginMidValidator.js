const { body } = require("express-validator");
const path = require('path');
const fs = require("fs");


const loginValid = [
body("email")
.trim()
.notEmpty()
.withMessage("El campo email no puede estar vacio").bail()
.isEmail()
.withMessage("Debe de ingresar un email válido")
.custom((value, {req})=>{
    let usersFile = fs.readFileSync(path.join(__dirname, '../models/data/users.json'), { encoding: 'utf-8' });
    let users = JSON.parse(usersFile);     
    let match = users.find((user) => { return user.email === req.body.email})
    if(!match){
     throw new Error("El correo no coincide con un usuario registrado");
      }
      return true;
    })
,
body("password")
.trim()
.notEmpty()
.withMessage("El campo contraseña no puede estar vacio")
.isLength({ min: 8 })
.withMessage("La contraseña debe de tener como mínimo 8 caracteres")
];

module.exports = loginValid;