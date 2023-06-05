
const hotelController = require('express').Router();
const { create } = require('../services/hotelService');
const { parseError } = require('../util/parser');

hotelController.get('/:id/details', (req, res) => {
    res.render('details', {
        title: 'Hotel Details'
    });
});

hotelController.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Hotel'
    });
});

hotelController.post('/create', async (req, res) => {
    console.log(req.body);
    const hotel = {
        name: req.body.name,
        city: req.body.city,
        rooms: Number(req.body.rooms),
        imageUrl: req.body.imageUrl,
        owner: req.user._id
    };


    try {
        if (Object.values(hotel).some(v => !v)) {
            throw new Error('All fields are required!');
        }
        const result = await create(hotel);
        res.redirect('/');
    } catch (error) {
        res.render('create', {
            title: 'Create Hotel',
            body: hotel,
            errors: parseError(error)
        });
    }

})

hotelController.get('/:id/edit', (req, res) => {
    res.render('edit', {
        title: 'Edit Hotel'
    });
});
module.exports = hotelController;