const { body } = require("express-validator");
const path = require('path');
const fs = require("fs");
const db = require("../database/models");

const formValid = [
  body("nombre")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("El campo nombre no puede estar vacio")
    .isLength({ min: 2 })
    .withMessage("El nombre debe de tener al menos dos carácteres")
    .isAlpha()
    .withMessage("No se admiten números o caracteres especiales")
    ,
    body("apellido")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("El campo apellido no puede estar vacio")
    .isLength({ min: 2 })
    .withMessage("El apellido debe de tener al menos dos carácteres")
    .isAlpha()
    .withMessage("No se admiten números o caracteres especiales")
    ,
    body("email")
    .trim()
    .notEmpty()
    .withMessage("El campo email no puede estar vacio").bail()
    .isEmail()
    .withMessage("Debe de ingresar un email válido")
    .custom(async(value, {req})=>{
      let match =
        await db.Users.findOne({where:{userEmail : req.body.email}})   
      if(match){
       throw new Error("Email actualmente en uso");
        }
        return true;
      })
       ,
  body("fechaNacimiento")
    .notEmpty()
    .withMessage("El campo fecha no puede estar vacio").bail()
    .isDate().withMessage("La fecha debe tener un formato válido")
    .custom((value, {req})=>{
      let edadMinima = "2002/01/01";
      let edad = req.body.fechaNacimiento;
      if(edad > edadMinima){
        throw new Error("Debes tener 18 años o más para registrarte")
      }
      return true;
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("El campo contraseña no puede estar vacio")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe de tener como mínimo 8 caracteres")
    .matches(/^(?=.*[0-9])(?=.*[!@#$_.^&*])[a-zA-Z0-9!@#$_.^&*]{8,16}$/)
    .withMessage("La contraseña debe de tener un numero, una mayuscula y un caracter especial"),
    body("repassword")
    .notEmpty()
    .withMessage("El campo reingresar contraseña no puede estar vacio")
    // To delete leading and triling space
    .trim()
    // Custom validation: pasa el valor tomado desde el body
 
    .custom(async (confirmPassword, {req}) => {
      const password = req.body.password
      // If password and confirm password not same don't allow to sign up and throw error
      if(password !== confirmPassword){
        throw new Error('La contraseña no coincide con la ingresada')
      }
    }),
  body("profileImage")
    .custom((value, {req})=>{
    let file = req.file;
    let aceptedExt = ['.jpg', '.png', '.gif' ,'.webp'];
    if(!file){
      throw new Error('Tienes que subir una imagen')
    } else{
      let fileExt = path.extname(file.originalname);
     if(!aceptedExt.includes(fileExt)){
      throw new Error('Las extensiones permitidas son: ' + aceptedExt.join(', '));
    }
    }
    return true;
  }),
];

module.exports = formValid;
