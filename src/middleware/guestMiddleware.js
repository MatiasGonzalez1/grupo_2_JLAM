function guestMiddleware (req, res, next){
    if (req.session.userLogged == undefined) {
        next();
    }else{
        res.redirect('/index');
    }
}
module.exports = guestMiddleware;