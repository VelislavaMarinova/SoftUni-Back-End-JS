const homeController = require('express').Router();

const { isUser } = require('../middlewares/guardsMW');
const { getAllPublicBydate, getThreeByLikesCount, getAllByDate,getAllByLikesCount } = require('../services/playService')

homeController.get('/', async (req, res) => {
    let plays;
    //TODO//if there is different logic for user and guest except navbar
    if (req.user) {
        //user homepage
        plays = await getAllPublicBydate();
    } else {
        //guest homepage
        plays = await getThreeByLikesCount();
    }
    res.render('home', {
        title: 'Home Page',
        plays,
    });
});

homeController.get('/sortByDate',isUser(), async (req, res) => {
    const plays = await getAllByDate()

    res.render('home', {
        title: 'Home Page',
        plays
    });
});
homeController.get('/sortByLikes',isUser(), async (req, res) => {
    const plays = await getAllByLikesCount()

    res.render('home', {
        title: 'Home Page',
        plays
    });
});
module.exports = homeController;

//todo replace with real controller