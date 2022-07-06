const path = require ('path');
const multer = require ('multer');

const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/productImg');
    },

    //criterio de nombramiento de imagen segun email
    filename: (req, file, cb) => {
        const fileName = req.body.fnombre + '-' + Date.now() + path.extname(file.originalname); 
        cb(null, fileName)
    }
})

let maxFileSize = 8388608;
let upload = multer({
    storage: productStorage,
    limits: { fileSize: maxFileSize}, // criterio de MaxFileSize = 3MB
    fileFilter: (req, file, cb) => {
            let type = file.mimetype.startsWith('image/');  // Le digo a multer que el tipo de dato acetado debe ser imagen
            if (type){
                cb(null, true)
            }else{
                cb(null, false, new Error('No es un archivo permitido'));}
    }
}).single('fprodfoto');

module.exports = upload;