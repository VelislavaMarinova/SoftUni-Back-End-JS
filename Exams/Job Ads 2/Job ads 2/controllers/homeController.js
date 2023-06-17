const homeController = require('express').Router();
const { getFirstThree } = require('../services/adService')

homeController.get('/', async (req, res) => {

    const firstThreeAds = await getFirstThree()
    // TODO//if there is different logic for user and guest except navbar
    // if(req.user){
    //     //user homepage
    // }else{
    //     //guest homepage
    // }
    res.render('home', {
        title: 'Home Page',
        firstThreeAds,
    });
});

module.exports = homeController;

//todo replace with real controller