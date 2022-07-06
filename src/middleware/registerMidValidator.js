const { body} = require('express-validator');

const formValid = [
    body('nombre').notEmpty().withMessage('Este campo no puede estar vacío'),
    body('email').notEmpty().isEmail().withMessage('Debe ingresar un email válido'),
    body('fechaNacimiento').isDate(),
    body('password').notEmpty().length({min: 5}),
    body('rePassword'),
    body('profileImage'),

]

module.exports = formValid;