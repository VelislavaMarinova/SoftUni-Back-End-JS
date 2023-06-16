const profileController = require('express').Router();
const { getAllByUserId } = require('../services/tripService')

profileController.get('/', async (req, res) => {
    console.log(req.user);
    const { _id, email, gender } = req.user;
    const allUserTrips = await getAllByUserId(_id);
    const isMale = gender == 'male'

    res.render('profile', {
        title: 'Profile Page',
        allUserTrips,
        email,
        isMale
    })
});

module.exports = profileController;