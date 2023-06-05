const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const hotelController = require("../controllers/hotelController");
const profileController = require("../controllers/profileController");
const {isUser}=require('../middlewares/guardsMW')

module.exports = (app)=>{
    app.use('/',homeController);
    app.use('/auth', authController);
    app.use('/hotel',isUser(), hotelController);
    app.use('/profile',profileController);
};