function authMiddleware (req, res, next){
    if (req.session.userLogged != undefined) {
        next();
    }
    res.redirect('/login');
    window.alert("No tienes los permisos necesarios");
}
module.exports = authMiddleware;