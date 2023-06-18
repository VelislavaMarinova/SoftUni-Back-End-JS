const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const animalController = require('../controllers/animalController')

module.exports = (app)=>{
    app.use('/',homeController);
    app.use('/auth', authController);
    app.use('/animal',animalController);
    app.get('*', (req, res) => {
        res.render('404', {
            title: '404 Page'
        })
    })
};