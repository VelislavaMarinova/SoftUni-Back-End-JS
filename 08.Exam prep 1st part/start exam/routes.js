const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');

const sthController = require('./controllers/SthController');

router.use(homeController); 
router.use(authController);

router.use('/sth',sthController)//connect routes with controller

module.exports = router;