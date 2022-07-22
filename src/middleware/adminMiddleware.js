function adminMiddleware (req, res, next){
    if (req.session.isAdmin != false) {
        next();
    }else{
        res.redirect('/');
    }
}
module.exports = adminMiddleware;