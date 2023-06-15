const photoController = require('express').Router();
const { isUser, } = require('../middlewares/guardsMW')

const {
    createPhoto,
    getAll,
    getOneById,
    deletePhoto,
    editPhoto,
    commentPhoto
} = require('../services/photoService');
const { parseError } = require('../util/parser');



photoController.get('/create', isUser(), (req, res) => {
    res.render('create', {
        title: 'Create Photo',
    });
});

photoController.get('/catalog', async (req, res) => {

    const photos = await getAll()
    // res.json(photos)

    res.render('catalog', {
        title: 'Catalog Page',
        photos,
    });
});

photoController.get('/:id', async (req, res) => {
    const photoId = req.params.id;

    const photo = await getOneById(photoId);
    if (req.user) {
        const userId = req.user._id;
        photo.isOwner = photo.ownerId == userId;
        console.log(photo.isOwner);
        //photo.isBuyer = photo.boughtBy.some(x => x == userId);

    }
    console.log(photo.isOwner, "owner");

    res.render('details', {
        title: 'Details Page',
        photo,
    });
});

photoController.get('/:id/delete', isUser(), async (req, res) => {
    const photoId = req.params.id;
    const userId = req.user._id
    const photo = await getOneById(photoId);
    console.log(photo);
    const isOwner = photo.ownerId == userId;

    if (!isOwner) {
        return res.redirect('/');
    }

    await deletePhoto(photoId);
    res.redirect('/photo/catalog')
});

photoController.post('/create', isUser(), async (req, res) => {
    const photo = req.body;
    photo.ownerId = req.user._id;
    photo.ownerUsername = req.user.username;

    try {

        await createPhoto(photo)
        res.redirect('/photo/catalog')//to catalog
    } catch (error) {
        const errors = parseError(error);
        res.render('create', {
            title: 'Create Photo',
            errors,
            body: photo
        })
    }
});

photoController.get('/:id/edit', isUser(), async (req, res) => {
    const photoId = req.params.id;
    const userId = req.user._id;
    const photo = await getOneById(photoId);
    const isOwner = photo.ownerId == userId;

    if (!isOwner) {
        return res.redirect('/');
    }

    res.render('edit', {
        title: 'Edit Photo',
        photo,
    });

});

photoController.post('/:id/edit', isUser(), async (req, res) => {
    const photoId = req.params.id;
    const userId = req.user._id;
    const photo = await getOneById(photoId);
    const isOwner = photo.ownerId == userId;

    if (!isOwner) {
        return res.redirect('/');
    }
    const editedPhoto = req.body;

    try {
        if (Object.values(editedPhoto).some(v => !v)) {
            throw new Error('All fields are required!');
        }
        const result = await editPhoto(photoId, editedPhoto);

        res.redirect(`/photo/${photoId}`);

    } catch (error) {
        res.render('edit', {
            title: 'Edit Photo',
            errors: parseError(error),
            photo: req.body,
        });
    }
});

photoController.post('/:id/comment',isUser(), async (req, res) => {
    const photoId = req.params.id;
    const userId = req.user._id;
    console.log('comment',req.body.comment);

    const photo = await getOneById(photoId);
    photo.isOwner = photo.ownerId == userId;
    console.log(req.user.username,req.body.comment);

    try {
        if (photo.isOwner) {
            throw new Error('Cannot comment your own photo')
        }
        await commentPhoto(photoId, {
            username: req.user.username,
            comment: req.body.comment
        });
     
        res.redirect(`/photo/${photoId}`)
    } catch (error) {
        const errors = parseError(error);
        res.render('details', {
            title: 'Details Page',
            errors,
            photo,
        });
    }

});

// photoController.get('/:id/buy', async (req, res) => {
//     const gameId = req.params.id;
//     const userId = req.user._id;
//     const game = await getOneById(gameId);
//     const isOwner = game.ownerId == userId;
//     const userIsBuyer = game.boughtBy.some(x => x == userId)

//     if (!isOwner && !userIsBuyer) {
//         console.log('IsBuyer');
//         await buyGame(gameId, userId);
//     }

//     return res.redirect(`/game/${gameId}`);
// });


module.exports = photoController;