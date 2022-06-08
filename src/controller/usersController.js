const path = require('path');

const usersController = {

    login: (req, res) =>{
        res.render(path.join(__dirname, '../views/users/login.ejs'))
    },


}

module.exports = usersController;