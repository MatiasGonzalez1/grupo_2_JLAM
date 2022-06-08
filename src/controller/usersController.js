const path = require('path');

const usersController = {

    login: (req, res) =>{
        res.render(path.join(__dirname, '../views/users/login.ejs'))
    },

    admin: (req, res) =>{
        res.render(path.join(__dirname, '../views/adminArea.ejs'))
    },


}

module.exports = usersController;