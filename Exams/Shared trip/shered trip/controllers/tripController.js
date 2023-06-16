const tripController = require('express').Router();
const { isUser, } = require('../middlewares/guardsMW')

const {
    createTrip,
    deleteTrip,
    getAll,
    editTrip,
    getOneById,
    joinTrip,

} = require('../services/tripService');
const { parseError } = require('../util/parser');



tripController.get('/create', isUser(), (req, res) => {
    res.render('create', {
        title: 'Create Page',
    });
});

tripController.get('/catalog', async (req, res) => {

    const trips = await getAll()

    res.render('catalog', {
        title: 'Catalog Page',
        trips,
    });
});

tripController.get('/:id/details', async (req, res) => {
    const tripId = req.params.id;


    const trip = await getOneById(tripId) //.populate('commentList.user');
    // if (!req.user) {
    //     return res.render('details', {
    //         title: 'Details Page',
    //         photo,
    //     });
    // };

    const isOwner = req.user?._id == trip.owner._id;
    const hasJoined = trip.buddies.some(x => x == req.user?.email);
    const buddies =  trip.buddies.join(', ')
    console.log(buddies);


    res.render('details', {
        title: 'Details Page',
        trip,
        isOwner,
        hasJoined,
        buddies
    });
});

tripController.get('/:id/delete', isUser(), async (req, res) => {
    const tripId = req.params.id;
    const userId = req.user._id
    // const photoData = await getOneById(photoId);


    // if (!isOwner) {
    //     return res.redirect('/');
    // }
    const trip = await getOneById(tripId);
    try {
        const isOwner = trip.owner._id == userId;

        if (!isOwner) {
            throw new Error('Only creator can delete trip!');
            //return res.redirect('/');
        }
        await deleteTrip(tripId);
        res.redirect('/trip/catalog')

    } catch (error) {
        const errors = parseError(error);
        res.render('details', {
            title: 'Details Page',
            errors,
            trip
        });
    };
});

tripController.post('/create', isUser(), async (req, res) => {
    const inputData = {
        ...req.body,
        owner: req.user._id,
        // ownerUsername: req.user.username
    };
    // photo.ownerId = req.user._id;
    // photo.ownerUsername = req.user.username;

    try {

        await createTrip(inputData)
        res.redirect('/trip/catalog')//to catalog
    } catch (error) {
        const errors = parseError(error);
        res.render('create', {
            title: 'Create Page',
            errors,
            body: inputData
        });
    }
});

tripController.get('/:id/edit', isUser(), async (req, res) => {
    const tripId = req.params.id;
    const userId = req.user._id;
    const trip = await getOneById(tripId);
    const isOwner = trip.owner._id == userId;
    try {
        if (!isOwner) {
            throw new Error('Only creator can edit photo!')
            //return res.redirect('/');
        }

        res.render('edit', {
            title: 'Edit Page',
            trip,
        });
    } catch (error) {
        res.render('details', {
            title: 'Details Page',
            errors: parseError(error),
            trip,
        });
    };
});

tripController.post('/:id/edit', isUser(), async (req, res) => {
    const tripId = req.params.id;
    const userId = req.user._id;
    const trip = await getOneById(tripId);
    const isOwner = trip.owner._id == userId;

    const editedTripData = req.body;

    try {
        if (!isOwner) {
            throw new Error('Only creator can edit trip!')
            // return res.redirect('/');
        }
        // if (Object.values(editedPhotoData).some(v => !v)) {
        //     throw new Error('All fields are required!');
        // }
        const result = await editTrip(tripId, editedTripData);

        res.redirect(`/trip/${tripId}/details`);

    } catch (error) {
        res.render('edit', {
            title: 'Edit Photo',
            errors: parseError(error),
            photoData: trip,
        });
    }
});

// tripController.post('/:id/comment', isUser(), async (req, res) => {
//     const photoId = req.params.id;
//     const { message } = req.body;
//     const user = req.user._id;

//     const commentData = { user, message }

//     await commentPhoto(photoId, commentData)

//     res.redirect(`/photo/${photoId}`)

//     // console.log('comment', req.body.comment);

//     // const photo = await getOneById(photoId);
//     // photo.isOwner = photo.ownerId == userId;
//     // console.log(req.user.username, req.body.comment);

//     // try {
//     //     if (photo.isOwner) {
//     //         throw new Error('Cannot comment your own photo')
//     //     }
//     //     await commentPhoto(photoId, {
//     //         username: req.user.username,
//     //         message: req.body.message
//     //     });

//     //     res.redirect(`/photo/${photoId}`)
//     // } catch (error) {
//     //     const errors = parseError(error);
//     //     res.render('details', {
//     //         title: 'Details Page',
//     //         errors,
//     //         photo,
//     //     });
//     // }

// });

tripController.get('/:id/join',isUser(), async (req, res) => {
    console.log('join');
    const tripId = req.params.id;
    const userId = req.user._id;
    const userEmail = req.user.email;
    const trip = await getOneById(tripId);
    console.log('trip', trip);
    const seats = trip.seats;

    const isOwner = trip.owner._id == userId;
    const hasJoined = trip.buddies.some(x => x == userEmail)
    console.log(isOwner, hasJoined, seats);
    try {
        if (isOwner) {
            throw new Error('You can not join your own trip')
        };
        if (hasJoined) {
            throw new Error('You have alredy joined this trip')
        };
        if (seats) {
console.log('act');
            await joinTrip(tripId, userEmail, seats);
            return res.redirect(`/trip/${tripId}/details`);
        }

    } catch (error) {
        console.log(error);
        res.render('details', {
            title: 'Details Page',
            errors: parseError(error),
            trip,
        });
    }

    // if (!isOwner && !userIsBuyer) {
    //     console.log('IsBuyer');
    //     await buyGame(gameId, userId);
    // }

    // return res.redirect(`/game/${gameId}`);
});


module.exports = tripController;