function adminMiddleware (req, res, next){
    if (req.session.isAdmin == true) {
        next();
    }else{
        res.redirect('/');
    }
}
module.exports = adminMiddleware;