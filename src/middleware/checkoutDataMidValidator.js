const { body } = require("express-validator");
const path = require('path');

const checkoutData = [
    body("checkoutName")
      .escape()
      .trim()
      .notEmpty()
      .withMessage("El campo nombre no puede estar vacio")
      .isLength({ min: 2 })
      .withMessage("El nombre debe de tener al menos dos carácteres")
      .isAlpha()
      .withMessage("No se admiten números o caracteres especiales"),
    body("checkoutLastName")
      .escape()
      .trim()
      .notEmpty()
      .withMessage("El campo nombre no puede estar vacio")
      .isLength({ min: 2 })
      .withMessage("El nombre debe de tener al menos tres carácteres"),
    body("checkoutEmail")
      .trim()
      .notEmpty()
      .withMessage("El campo email no puede estar vacio").bail()
      .isEmail()
      .withMessage("Debe ingresar un email válido"),
    body("city")
      .trim()
      .notEmpty()
      .withMessage("Debes ingresar la ciudad correspondiente").bail(),
    body("checkoutAddress")
      .trim()
      .notEmpty().withMessage("El campo dirección es obligatorio").bail()
      .custom((value, {req})=>{
        let address = req.body.checkoutAddress;
        let expresion = (/\d/);
        if (address.length < 3) {
          throw new Error('Ingrese una dirección valida')
        }
        if (!address.match(expresion)) {
          throw new Error('Debe incluir la numeración')
        }
        return true;
      }),
    body("checkoutFloor")
      .trim()
      .custom((value, {req})=>{
        let floor = req.body.checkoutFloor;
        let expresion = (/\d/);
        if(floor){
          if (!floor.match(expresion)) {
            throw new Error('Debe incluir la numeración')
          }
        }
        return true;
      }),
];

module.exports = checkoutData;
