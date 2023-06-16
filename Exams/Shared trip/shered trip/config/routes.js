const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const profileController = require("../controllers/profileController");
const tripController = require('../controllers/tripController');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/trip', tripController);
    app.use('/profile',profileController)
    app.get('*', (req, res) => {
        res.render('404', {
            title: '404 Page'
        })
    })
};