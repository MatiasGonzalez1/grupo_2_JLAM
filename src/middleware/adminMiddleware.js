function adminMiddleware (req, res, next){
    if (req.session.isAdmin != false) {
        next();
    }else{
        res.redirect('/index');
        window.alert("No tienes los permisos necesarios");
    }
}
module.exports = adminMiddleware;