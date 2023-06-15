const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const photoController = require('../controllers/photoController');
const profileController = require('../controllers/profileController');
const { isUser } = require('../middlewares/guardsMW')
const notFoundController = require('../controllers/notFoundController');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/photo', photoController);
    app.use('/profile', isUser(), profileController);
    app.use('/*', notFoundController)
};