function authMiddleware (req, res, next){
    if (req.session.userLogged != undefined) {
        next();
    }
    res.redirect('/users/login');
    
}
module.exports = authMiddleware;