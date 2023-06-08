const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    // TODO//if there is different logic for user and guest except navbar
    // if(req.user){
    //     //user homepage
    // }else{
    //     //guest homepage
    // }
    res.render('home', {
        title: 'Home Page',
        user: req.user
    });
});

module.exports = homeController;

//todo replace with real controller