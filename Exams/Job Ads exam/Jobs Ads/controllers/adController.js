const adController = require('express').Router();
const { isUser, } = require('../middlewares/guardsMW')

const {
    getAll,
    getOneById,
    createData,
    editData,
    deleteData,
    apply

} = require('../services/adService');
const { parseError } = require('../util/parser');



adController.get('/create', isUser(), (req, res) => {

    res.render('create', {
        title: 'Create Ad',
    });
});

adController.get('/search', async (req, res) => {

    const search = Object.values(req.query).join();
    console.log(search);
    if (search) {

        const allAds = await getAll()
        //todo search
  
    }
    res.render('search', {
        title: 'Search Page'
    })

})

adController.get('/catalog', async (req, res) => {
    console.log('catalog');
    const ads = await getAll()

    res.render('catalog', {
        title: 'Catalog Page',
        ads,
    });
});

adController.get('/:id', async (req, res) => {
    const adId = req.params.id;

    const ad = await getOneById(adId);
    if (req.user) {
        const userId = req.user._id;
        ad.isOwner = ad.authorId == userId;
        console.log(ad.isOwner);
        //photo.isBuyer = photo.boughtBy.some(x => x == userId);
        const userHasApplied = ad.usersApplied.some(x => x == userId)
        console.log(userHasApplied);

        if (!ad.isOwner && userHasApplied) {
            ad.hasApplied = true
        }

    }



    console.log(ad.isOwner, "owner");
    console.log(ad.hasApplied, 'applied');

    res.render('details', {
        title: 'Details Page',
        ad,
    });
});

adController.get('/:id/delete', isUser(), async (req, res) => {
    const adId = req.params.id;
    const userId = req.user._id
    const ad = await getOneById(adId);
    const isOwner = ad.authorId == userId;

    if (!isOwner) {
        return res.redirect('/');
    }

    await deleteData(adId);
    res.redirect('/ad/catalog')
});

adController.post('/create', isUser(), async (req, res) => {
    const ad = req.body;
    ad.authorId = req.user._id;
    ad.authorEmail = req.user.email;

    try {

        await createData(ad)
        res.redirect('/ad/catalog')//to catalog
    } catch (error) {
        const errors = parseError(error);
        res.render('create', {
            title: 'Create Photo',
            errors,
            body: ad,
        })
    }
});

adController.get('/:id/edit', isUser(), async (req, res) => {
    const adId = req.params.id;
    const userId = req.user._id;
    const ad = await getOneById(adId);
    const isOwner = ad.authorId == userId;

    if (!isOwner) {
        return res.redirect('/');
    }

    res.render('edit', {
        title: 'Edit Photo',
        ad,
    });
});

adController.post('/:id/edit', isUser(), async (req, res) => {
    const adId = req.params.id;
    const userId = req.user._id;
    const ad = await getOneById(adId);
    const isOwner = ad.authorId == userId;

    if (!isOwner) {
        return res.redirect('/');
    }
    const editedData = req.body;

    try {
        await editData(adId, editedData);

        res.redirect(`/ad/${adId}`);

    } catch (error) {
        res.render('edit', {
            title: 'Edit Ad',
            errors: parseError(error),
            ad: req.body,
        });
    }
});

adController.get('/:id/apply', async (req, res) => {
    const adId = req.params.id;
    const userId = req.user._id;
    const ad = await getOneById(adId);
    try {
        const userData = {
            email: req.user.email,
            skills: req.user.skills
        }
        console.log(userData);
        const isOwner = ad.authorId == userId;
        const userHasApplied = ad.usersApplied.some(x => x == userId)
        if (isOwner) {
            throw new Error('Cannot apply for your own job!')
        }
        if (userHasApplied) {
            // ad.isOwner = true;

            throw new Error('You have alredy apply for this job!')
        }


        await apply(adId, userId, userData);
    } catch (error) {

        const errors = parseError(error);
        //TODO add error display to actual template
        res.render('details', {
            title: 'Details Page',
            errors,
            body: ad
        })


        // console.log(error);
        // const errors = parseError(error);
        // res.render('details', {
        //     title: 'Details Ad',
        //     errors,
        //     body: ad,
        // })

    }


    return res.redirect(`/ad/${adId}`);
});

// photoController.post('/:id/comment',isUser(), async (req, res) => {
//     const photoId = req.params.id;
//     const userId = req.user._id;
//     console.log('comment',req.body.comment);

//     const photo = await getOneById(photoId);
//     photo.isOwner = photo.ownerId == userId;
//     console.log(req.user.username,req.body.comment);

//     try {
//         if (photo.isOwner) {
//             throw new Error('Cannot comment your own photo')
//         }
//         await commentPhoto(photoId, {
//             username: req.user.username,
//             comment: req.body.comment
//         });

//         res.redirect(`/photo/${photoId}`)
//     } catch (error) {
//         const errors = parseError(error);
//         res.render('details', {
//             title: 'Details Page',
//             errors,
//             photo,
//         });
//     }

// });

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


module.exports = adController;