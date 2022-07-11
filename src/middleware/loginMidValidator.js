const { body } = require("express-validator");

const loginValid = [
body("email")
.trim()
.notEmpty()
.withMessage("El campo email no puede estar vacio").bail()
.isEmail()
.withMessage("Debe de ingresar un email válido"),
body("password")
.trim()
.notEmpty()
.withMessage("El campo contraseña no puede estar vacio")
.isLength({ min: 8 })
.withMessage("La contraseña debe de tener como mínimo 8 caracteres")
];

module.exports = loginValid;