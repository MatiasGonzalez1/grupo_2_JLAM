function adminMiddleware (req, res, next){
    if (req.session.isAdmin != false) {
        next();
    }else{
        res.redirect('/index');
    }
}
module.exports = adminMiddleware;