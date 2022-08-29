const { body } = require("express-validator");
const path = require('path');

const updateUserValid = [
    body("nombre")
        .escape()
        .trim()
        .notEmpty()
        .withMessage("El campo nombre no puede estar vacio")
        .isLength({ min: 2 })
        .withMessage("El nombre debe de tener al menos dos carácteres")
        .isAlpha()
        .withMessage("No se admiten números o caracteres especiales"),
    body("apellido")
        .escape()
        .trim()
        .notEmpty()
        .withMessage("El campo nombre no puede estar vacio")
        .isLength({ min: 3 })
        .withMessage("El nombre debe de tener al menos tres carácteres"),
    body("direccion")
        .trim()
        .custom((value, {req})=>{
          let address = req.body.direccion;
          let expresion = (/\d/);
          if (address) {
            if (address.length < 3) {
              throw new Error('Ingrese una dirección valida')
            }
    
            if (!address.match(expresion)) {
              throw new Error('Debe incluir la numeración')
            }
          }
          return true;
        }),
    body("email")
        .trim()
        .notEmpty()
        .withMessage("El campo email no puede estar vacio").bail()
        .isEmail()
        .withMessage("Debe ingresar un email válido"),
    body("fechaNacimiento")
        .notEmpty().withMessage("El campo fecha no puede estar vacio").bail()
        .isDate().withMessage("La fecha debe tener un formato válido")
        .custom((value, {req})=>{
          let edadMinima = "2002/01/01";
          let edad = req.body.fechaNacimiento;
          if(edad > edadMinima){
              throw new Error('Debes tener 18 años o más')
          }
          return true;
    }),

    body("password")
    .custom((value, {req})=>{
      let pass = req.body.password;
      let expresion = (/^(?=.*[0-9])(?=.*[!@#$_.^&*])[a-zA-Z0-9!@#$_.^&*]{8,16}$/);
      if (pass) {
        if (pass.length < 8) {
          throw new Error('La contraseña debe de tener como mínimo 8 caracteres')
        }

        if (!pass.match(expresion)) {
          throw new Error('La contraseña debe de tener un numero, una mayuscula y un caracter especial')
        }
      }
      return true;
    }),
       
    body("profileImage")
    .custom((value, {req})=>{
    let file = req.file;
    let aceptedExt = ['.jpg', '.png', '.gif' ,'.webp'];
        if(file){
          let fileExt = path.extname(file.originalname);
         if(!aceptedExt.includes(fileExt)){
          throw new Error('Las extensiones permitidas son: ' + aceptedExt.join(', '));
        }
        }
    return true;
  }),
];

module.exports = updateUserValid;
