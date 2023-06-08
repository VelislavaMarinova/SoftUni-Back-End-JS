const { veryfyToken } = require("../services/userService");

module.exports = () => (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        // console.log(token);
        try {
            const userData = veryfyToken(token);
            console.log('Read succesful', userData.username);
            req.user = userData;
            res.locals.username = userData.username;
        } catch (error) {
            console.log('Invalid token');
            res.clearCookie('token');
            res.redirect('/auth/login');
            return;
        }
    }
    next();
};