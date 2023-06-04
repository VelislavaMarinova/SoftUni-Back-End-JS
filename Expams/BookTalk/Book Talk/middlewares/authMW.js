const jwt = require('../lib/jsonwebtoken');
const {SECRET}=require('../constants');

exports.authenticationMW = async(req, res, next) => {
    const token = req.cookies['auth'];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, SECRET);

            req.user = decodedToken;
            res.locals.isAutenticated = true;
            res.locals.user = decodedToken;
            
        } catch (error) {
            res.clearCookie('auth');

           return res.status(401).render('home/404');
        }

    }

    next();

};

exports.isAutorized = (req,res,next)=>{
    if(!req.user){
       return res.redirect('/login')
    }

    next();
};