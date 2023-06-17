const adController = require('express').Router();
const { isUser, } = require('../middlewares/guardsMW')

const {
    createAd,
    deleteAd,
    editAd,
    getAll,
    getOneById,
    apply,
    getAllPopulateAutor
} = require('../services/adService');
const { parseError } = require('../util/parser');



adController.get('/create', isUser(), (req, res) => {
    res.render('create', {
        title: 'Create Page',
    });
});

adController.get('/catalog', async (req, res) => {

    const ads = await getAll()

    res.render('catalog', {
        title: 'Catalog Page',
        ads,
    });
});

adController.get('/:id/details', async (req, res) => {
    const adId = req.params.id;
    const userId = req.user?._id;


    const ad = await getOneById(adId).populate('applies');
    console.log('details', ad);

    const hasApplied = ad.applies.some(x => x._id == userId)

    const isOwner = req.user?._id == ad.author._id;
    const authorEmail = ad.author.email

    res.render('details', {
        title: 'Details Page',
        ad,
        isOwner,
        authorEmail,
        hasApplied,
        // buddies
    });
});

adController.get('/:id/delete', isUser(), async (req, res) => {
    const adId = req.params.id;
    const userId = req.user._id

    const ad = await getOneById(adId);

    try {
        const isOwner = ad.author._id == userId;

        if (!isOwner) {
            throw new Error('Only creator can delete trip!');
        }
        await deleteAd(adId);
        res.redirect('/ad/catalog')

    } catch (error) {
        const errors = parseError(error);
        res.render('details', {
            title: 'Details Page',
            errors,
            ad
        });
    };
});

adController.post('/create', isUser(), async (req, res) => {
    const inputData = {
        ...req.body,
        author: req.user._id,
    };

    try {
        await createAd(inputData)
        res.redirect('/ad/catalog')//to catalog
    } catch (error) {
        const errors = parseError(error);
        res.render('create', {
            title: 'Create Page',
            errors,
            body: inputData
        });
    }
});

adController.get('/:id/edit', isUser(), async (req, res) => {
    const adId = req.params.id;
    const userId = req.user._id;
    const ad = await getOneById(adId);
    const isOwner = ad.author._id == userId;
    try {
        if (!isOwner) {
            throw new Error('Only creator can edit job!')
        }

        res.render('edit', {
            title: 'Edit Page',
            ad,
        });
    } catch (error) {
        res.render('details', {
            title: 'Details Page',
            errors: parseError(error),
            ad,
        });
    };
});

adController.post('/:id/edit', isUser(), async (req, res) => {
    const adId = req.params.id;
    const userId = req.user._id;
    const ad = await getOneById(adId);
    const isOwner = ad.author._id == userId;

    const editedData = req.body;

    try {
        if (!isOwner) {
            throw new Error('Only creator can edit job!')
        }

        const result = await editAd(adId, editedData);

        res.redirect(`/ad/${adId}/details`);

    } catch (error) {
        res.render('edit', {
            title: 'Edit Page',
            errors: parseError(error),
            ad,
        });
    }
});

adController.get('/:id/apply', isUser(), async (req, res) => {
    console.log('apply');
    const adId = req.params.id;
    const userId = req.user._id;
    const userEmail = req.user.email;
    const ad = await getOneById(adId);

    const isOwner = ad.author._id == userId;
    const hasApplied = ad.applies.some(x => x == userId)

    try {
        if (isOwner) {
            throw new Error('You can not apply your own job')
        };
        if (hasApplied) {
            throw new Error('You have alredy applied for this job')
        };

        await apply(adId, userId);
        return res.redirect(`/ad/${adId}/details`);


    } catch (error) {
        console.log(error);
        res.render('details', {
            title: 'Details Page',
            errors: parseError(error),
            ad,
        });
    }

});

adController.get('/search', async (req, res) => {
    const search = req.query?.search;
let searchResult;
    if (search) {
        searchResult = await getAllPopulateAutor(search)
        searchResult = searchResult.filter(x=>x.author.email == search)
    }
    console.log(searchResult);

    res.render('search', {
        title: 'Search Page',
        searchResult,
        search
    })
});


module.exports = adController;