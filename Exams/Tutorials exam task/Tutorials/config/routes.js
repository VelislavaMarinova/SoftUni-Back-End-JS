const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const courseController = require('../controllers/courseController')
const { isGuest, isUser } = require('../middlewares/guardsMW')

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/course', isUser(), courseController);
};