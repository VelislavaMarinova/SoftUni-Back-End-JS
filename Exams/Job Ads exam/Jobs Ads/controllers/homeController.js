const { getThree } = require('../services/adService');

const homeController = require('express').Router();

homeController.get('/', async(req, res) => {
    
const ads = await getThree()
    // TODO//if there is different logic for user and guest except navbar
    // if(req.user){
    //     //user homepage
    // }else{
    //     //guest homepage
    // }
    res.render('home', {
        title: 'Home Page',
        ads,
        
    });
});

module.exports=homeController;

//todo replace with real controller