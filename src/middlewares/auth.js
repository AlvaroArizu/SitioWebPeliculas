module.exports = ( req, res, next )=> {
    res.locals.isLogged = false;
    res.locals.isAdmin = false;
    
    if(req.session.admin){
        res.locals.isAdmin = true;
        res.locals.admin = req.session.admin;
    }

    if (req.session.user) {
        res.locals.isLogged = true;
        res.locals.user = req.session.user;
    }

    next()
}