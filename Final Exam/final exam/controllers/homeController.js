const homeController = require('express').Router();
const { getLastThree } = require('../services/animalService')

homeController.get('/', async (req, res) => {
  
    const lastThreeAnimals = await getLastThree();
    console.log('lastThreeAnimals',lastThreeAnimals);

    res.render('home', {
        title: 'Home Page',
        lastThreeAnimals,
    });
});

module.exports = homeController;
