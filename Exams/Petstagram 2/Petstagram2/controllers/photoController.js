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
    console.log('photos', photos);
    // res.json(photos)

    res.render('catalog', {
        title: 'Catalog Page',
        photos,
    });
});

photoController.get('/:id', async (req, res) => {
    const photoId = req.params.id;

    const photoData = await getOneById(photoId).populate('commentList.user');
    // if (!req.user) {
    //     return res.render('details', {
    //         title: 'Details Page',
    //         photo,
    //     });
    // };
    const isOwner = req.user?._id == photoData.owner._id;


    res.render('details', {
        title: 'Details Page',
        photoData,
        isOwner
    });
});

photoController.get('/:id/delete', isUser(), async (req, res) => {
    const photoId = req.params.id;
    const userId = req.user._id
    // const photoData = await getOneById(photoId);


    // if (!isOwner) {
    //     return res.redirect('/');
    // }
    const photoData = await getOneById(photoId);
    try {
        const isOwner = photoData.owner._id == userId;

        if (!isOwner) {
            throw new Error('Only creator can delete photo!');
            //return res.redirect('/');
        }
        await deletePhoto(photoId);
        res.redirect('/photo/catalog')

    } catch (error) {
        const errors = parseError(error);
        res.render('details', {
            title: 'Details Page',
            errors,
            photoData
        })
    }
});

photoController.post('/create', isUser(), async (req, res) => {
    const photoData = {
        ...req.body,
        owner: req.user._id,
        // ownerUsername: req.user.username
    };
    // photo.ownerId = req.user._id;
    // photo.ownerUsername = req.user.username;

    try {

        await createPhoto(photoData)
        res.redirect('/photo/catalog')//to catalog
    } catch (error) {
        const errors = parseError(error);
        res.render('create', {
            title: 'Create Photo',
            errors,
            body: photoData
        });
    }
});

photoController.get('/:id/edit', isUser(), async (req, res) => {
    const photoId = req.params.id;
    const userId = req.user._id;
    const photoData = await getOneById(photoId);
    const isOwner = photoData.owner._id == userId;
    try {
        if (!isOwner) {
            throw new Error('Only creator can edit photo!')
            //return res.redirect('/');
        }

        res.render('edit', {
            title: 'Edit Photo',
            photoData,
        });
    } catch (error) {
        res.render('details', {
            title: 'Details Page',
            errors: parseError(error),
            photoData,
        });
    };
});

photoController.post('/:id/edit', isUser(), async (req, res) => {
    const photoId = req.params.id;
    const userId = req.user._id;
    const photoData = await getOneById(photoId);
    const isOwner = photoData.owner._id == userId;

    if (!isOwner) {
        throw new Error('Only creator can edit photo!')
        // return res.redirect('/');
    }
    const editedPhotoData = req.body;

    try {
        if (Object.values(editedPhotoData).some(v => !v)) {
            throw new Error('All fields are required!');
        }
        const result = await editPhoto(photoId, editedPhotoData);

        res.redirect(`/photo/${photoId}`);

    } catch (error) {
        res.render('edit', {
            title: 'Edit Photo',
            errors: parseError(error),
            photoData,
        });
    }
});

photoController.post('/:id/comment', isUser(), async (req, res) => {
    const photoId = req.params.id;
    const { message } = req.body;
    const user = req.user._id;

    const commentData = { user, message }

    await commentPhoto(photoId, commentData)

    res.redirect(`/photo/${photoId}`)

    // console.log('comment', req.body.comment);

    // const photo = await getOneById(photoId);
    // photo.isOwner = photo.ownerId == userId;
    // console.log(req.user.username, req.body.comment);

    // try {
    //     if (photo.isOwner) {
    //         throw new Error('Cannot comment your own photo')
    //     }
    //     await commentPhoto(photoId, {
    //         username: req.user.username,
    //         message: req.body.message
    //     });

    //     res.redirect(`/photo/${photoId}`)
    // } catch (error) {
    //     const errors = parseError(error);
    //     res.render('details', {
    //         title: 'Details Page',
    //         errors,
    //         photo,
    //     });
    // }

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