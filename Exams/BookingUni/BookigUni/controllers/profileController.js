const profileController = require('express').Router();
const { isUser } = require('../middlewares/guardsMW');
const { getByUserBooking } = require('../services/hotelService');

profileController.get('/', async (req, res) => {

    const bookings = await getByUserBooking(req.user._id)
    const user = Object.assign({ bookings }, req.user);//!!!
    // console.log('user',user);
    
    res.render('profile', {
        title: 'Profile Page',
        user,
    })
});

module.exports = profileController