function guestMiddleware (req, res, next){
    if (req.session.userLogged == undefined) {
        next();
    }else{
        res.redirect('/index');
        window.alert("No tienes los permisos necesarios");
    }
}
module.exports = guestMiddleware;