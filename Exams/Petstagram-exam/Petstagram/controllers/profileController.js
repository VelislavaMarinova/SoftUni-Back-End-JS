const profileController = require('express').Router();
const { getAll } = require('../services/photoService')
//const { getByUserBooking } = require('../services/hotelService');

profileController.get('/', async (req, res) => {
    const user = req.user;
    const userId = req.user._id;
    const photos = await getAll()
    const ownerPhotos = photos.filter(x => x.ownerId == userId)
   
    console.log(userId);
    console.log('ownerPhotos',ownerPhotos);
    // const bookings = await getByUserBooking(req.user._id)
    // const user = Object.assign({ bookings }, req.user);//!!!
    // console.log('user',user);

    res.render('profile', {
        title: 'Profile Page',
        ownerPhotos,
        user,
    })
})

module.exports = profileController;
