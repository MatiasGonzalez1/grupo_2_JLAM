const path = require ('path');
const multer = require ('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/productImg');
    },

    //criterio de nombramiento de imagen segun email
    filename: (req, file, cb) => {
        const fileName = req.body.fnombre + '-' + Date.now() + path.extname(file.originalname); 
        cb(null, fileName)
    }
})

let upload = multer({storage});

module.exports = upload;