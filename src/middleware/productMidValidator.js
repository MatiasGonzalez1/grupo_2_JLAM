const { body } = require('express-validator');
const path = require('path');

const validProduct = [
    body('fnombre').trim().notEmpty().withMessage('Debes completar el campo de nombre')
    .isLength({ min: 6 })
    .withMessage("El nombre debe de tener al menos seis carácteres"), 
    body('fcategoria').trim().notEmpty().withMessage('Debes elegir una categoría'), 
    body('fcoseAnio').trim().notEmpty().withMessage('Debes completar el campo año de cosecha')
    .isNumeric().withMessage('Debes completar el campo con numeros para el año'), 
    body('fvariedad').trim().notEmpty().withMessage('Debes completar el campo variedad')
    .isLength({ min: 6 })
    .withMessage("El nombre debe de tener al menos seis carácteres"), 
    body('fcrianza').trim().notEmpty().withMessage('Debes completar el campo crianza')
    .isLength({ min: 6 })
    .withMessage("Crianza debe de tener al menos seis carácteres"), 
    body('fguarda').trim().notEmpty().withMessage('Debes completar el campo potencial de guarda')
    .isLength({ min: 5 })
    .withMessage("Guarda debe de tener al menos cinco carácteres"), 
    body('fnotacata').trim().notEmpty().withMessage('Debes completar el campo nota de cata')
    .isLength({ min: 40 })
    .withMessage("La descripcion del producto debe tener al menos cuarenta carácteres"), 
    body('fprodfoto').trim().custom((value, {req})=>{
        let file = req.file;
        let aceptedExtensions = ['.jpg', '.png', '.gif' ,'.webp'];
        if(!file){
          throw new Error('Tienes que subir una imagen')
        } else{
          let fileExtension = path.extname(file.originalname);
         if(!aceptedExtensions.includes(fileExtension)){
          throw new Error('Las extensiones permitidas son: ' + aceptedExtensions.join(', '));
        }
        }
    
        return true;
      }),
    
    body('fprecio').trim()
    .notEmpty().withMessage('Debes completar el campo precio')
    .isNumeric().withMessage('Debes completar el campo con numeros para el precio'), 
    body('fstock').trim()
    .notEmpty().withMessage('Debes completar el campo stock')
    .isNumeric().withMessage('Debes completar el campo con numeros para el stock'), 
];  

module.exports = validProduct