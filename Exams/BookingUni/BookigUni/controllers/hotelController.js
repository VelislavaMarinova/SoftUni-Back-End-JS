
const hotelController = require('express').Router();
const { create, getById, update, deleteById, bookRoom } = require('../services/hotelService');
const { parseError } = require('../util/parser');

hotelController.get('/:id/details', async (req, res) => {
    const hotelId = req.params.id;
    const hotel = await getById(hotelId);
    const userId = req.user._id;
    const isOwner = hotel.owner == userId
    const isBooked = hotel.bookings.find(id => id == userId);

    if (isOwner) {
        hotel.userIsOwner = true
    } else if (isBooked) {
        hotel.isBooked = true;
    }

    res.render('details', {
        title: 'Hotel Details',
        hotel,
    });
});

hotelController.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Hotel'
    });
});

hotelController.post('/create', async (req, res) => {

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
});

hotelController.get('/:id/edit', async (req, res) => {
    const hotelId = req.params.id;
    const hotel = await getById(hotelId);
    const userId = req.user._id;

    const isOwner = hotel.owner == userId
    if (!isOwner) {
        return res.redirect('/auth/login');
    }

    res.render('edit', {
        title: 'Edit Hotel',
        hotel,
    });
});

hotelController.post('/:id/edit', async (req, res) => {

    const hotelId = req.params.id;
    const hotel = await getById(hotelId);
    const userId = req.user._id;

    const isOwner = hotel.owner == userId
    if (!isOwner) {
        return res.redirect('/auth/login');
    }

    const edited = {
        name: req.body.name,
        city: req.body.city,
        rooms: Number(req.body.rooms),
        imageUrl: req.body.imageUrl,
    };

    try {
        if (Object.values(edited).some(v => !v)) {
            throw new Error('All fields are required!');
        }
        const result = await update(hotelId, edited);
        res.redirect(`/hotel/${hotelId}/details`);
    } catch (error) {

        res.render('edit', {
            title: 'Edit Hotel',
            hotel: Object.assign(edited, { _id: hotelId }),
            errors: parseError(error)
        });
    }
});

hotelController.get('/:id/delete', async (req, res) => {

    const hotelId = req.params.id;
    const hotel = await getById(hotelId);
    const userId = req.user._id;
    const isOwner = hotel.owner == userId;
    if (!isOwner) {
        return res.redirect('/auth/login');
    }

    await deleteById(hotelId);
    res.redirect('/');

});

hotelController.get('/:id/book', async (req, res) => {

    const hotelId = req.params.id;
    const hotel = await getById(hotelId);
    const userId = req.user._id;
    const isOwner = hotel.owner == userId;
    const isBooked = hotel.bookings.find(id => id == userId);
    try {

        if (isOwner) {
            hotel.userIsOwner = true;
            throw new Error('Cannot book your own hotel!')
        }
        if (isBooked) {
            hotel.isBooked = true;
            throw new Error('Cannot book twice');
        }

        await bookRoom(hotelId, userId);
        res.redirect(`/hotel/${hotelId}/details`);
    } catch (error) {
        res.render('details', {
            title: 'Hotel Details',
            hotel,
            errors: parseError(error)
        });
    }


});
module.exports = hotelController;