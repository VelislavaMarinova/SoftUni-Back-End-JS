const isUser = (req, res, next) => {

    if (req.user) {
        next();
    } else {
        res.redirect('/auth/login')
    }

};

const isGuest = (req, res, next) => {

    if (req.user) {
        res.redirect('/')//TODO check assignement for correct redirect 
    } else {
        next()
    }

};

module.exports = {
    isUser,
    isGuest,
}