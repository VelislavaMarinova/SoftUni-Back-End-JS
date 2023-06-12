const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const auctionController = require('../controllers/auctionController');
const notFoundController = require("../controllers/notFoundController");

module.exports = (app)=>{
    app.use('/',homeController);
    app.use('/auth', authController);
    app.use('/auction', auctionController);
    app.use('/*',notFoundController);
};