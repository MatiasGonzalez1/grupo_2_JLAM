const { body } = require("express-validator");
const path = require('path');
const fs = require("fs");
const db = require("../database/models");


const loginValid = [
body("email")
.trim()
.notEmpty()
.withMessage("El campo email no puede estar vacio").bail()
.isEmail()
.withMessage("Debe de ingresar un email válido")
.custom( async (value, {req})=>{
    let users = await db.Users.findOne({
        where: {userEmail: req.body.email}
    })
    if(!users){
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