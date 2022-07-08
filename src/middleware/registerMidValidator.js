const { body } = require("express-validator");

const formValid = [
  body("nombre")
    .notEmpty()
    .withMessage("El campo nombre no puede estar vacio")
    .isLength({ min: 2 })
    .withMessage("El nombre debe de tener al menos dos carácteres"),
  body("email").notEmpty().withMessage("Debe ingresar un email válido"),
  body("fechaNacimiento")
    .isDate()
    .withMessage("Debes tener 18 años o más para registrarte"),
  body("password")
    .notEmpty()
    .withMessage("La contraseña no puede estar vacia")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe de tener como mínimo 8 caracteres")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage("La contraseña debe de tener un numero, una mayuscula y un caracter especial"),
  body("repassword")
    // To delete leading and triling space
    .trim()
  
    // Custom validation
    // Validate confirmPassword
    .custom(async (confirmPassword, {req}) => {
      const password = req.body.password
  
      // If password and confirm password not same
      // don't allow to sign up and throw error
      if(password !== confirmPassword){
        throw new Error('La contraseña no coincide con la ingresada')
      }
    }),
  body("profileImage"),
];

module.exports = formValid;
