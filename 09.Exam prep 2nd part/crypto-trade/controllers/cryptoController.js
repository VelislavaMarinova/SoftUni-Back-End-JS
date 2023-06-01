const router = require('express').Router();

const { isAutorized } = require('../middlewares/authMW');
const cryptoService = require('../services/cryptoService');
const { getErrorMessaage } = require('../utils/errorUtils');
const { selectPaymentMethods } = require('../utils/cryptoUtils');


router.get('/search', async (req, res) => {
    const { name, paymentMethod } = req.query;
    try {
        const allCryptoOffers = await cryptoService.search(name, paymentMethod);
        res.render('crypto/search', { allCryptoOffers });

    } catch (error) {

        return res.status(400).render('crypto/search', { error: getErrorMessaage(error) });

    }

});

router.get('/catalog', async (req, res) => {

    try {
        const allCryptoOffers = await cryptoService.getAll().lean();
        res.render('crypto/catalog', { allCryptoOffers });

    } catch (error) {

        return res.status(400).render('crypto/catalog', { error: getErrorMessaage(error) });

    }
});

router.get('/:cryptoOfferId/details', async (req, res) => {

    const cryptoOfferId = req.params.cryptoOfferId
    // console.log(cryptoOfferId);
    const oneCryptoOffer = await cryptoService.getOne(cryptoOfferId).lean();

    //if user is not logged in req.user._id ===undefined !!!
    let userId = '';
    if (req.user) {
        userId = req.user._id;
    }
    // console.log(oneCryptoOffer.ownerId);
    //!!!oneCryptoOffer.ownerId = new ObjectId("647496c025714f6d9223b931")so don't use ===
    const isOwner = userId == oneCryptoOffer.ownerId;
    // console.log(isOwner);
    const isBuyer = oneCryptoOffer.buyers.some(id => id == userId);//returns true/false - boolean

    //const isOwner = req.user?._id === oneCryptoOffer.ownerId
    // console.log(oneCryptoOffer);
    res.render('crypto/details', { oneCryptoOffer, isOwner, isBuyer })
});

router.get('/:cryptoOfferId/buy', isAutorized, async (req, res) => {
    const userId = req.user._id;
    const cryptoOfferId = req.params.cryptoOfferId
    try {

        await cryptoService.buy(userId, cryptoOfferId, res);

    } catch (error) {

        return res.status(400).render('home', { error: getErrorMessaage(error) });
    }

    res.redirect(`/crypto/${req.params.cryptoOfferId}/details`);
})

router.get('/create', isAutorized, async (req, res) => {//isAutorized routeguard
    res.render('crypto/create');
});

router.get('/:cryptoOfferId/edit', isAutorized, async (req, res) => {
    const cryptoOfferId = req.params.cryptoOfferId;
    const userId = req.user._id;
    try {
        const cryptoOfferData = await cryptoService.getOne(cryptoOfferId).lean();
        if (userId != cryptoOfferData.ownerId) {
            throw new Error('Forbidden page!');
        }
        const paymentMethods = selectPaymentMethods(cryptoOfferData.paymentMethod);
        res.render('crypto/edit', { cryptoOfferData, paymentMethods });

    } catch (error) {

        return res.status(400).render('home', { error: getErrorMessaage(error) });

    }

});

router.post('/:cryptoOfferId/edit', isAutorized, async (req, res) => {
    const cryptoOfferData = req.body
    const cryptoOfferId = req.params.cryptoOfferId
    const userId = req.user._id;
    //todo edit
    try {

        await cryptoService.edit(cryptoOfferId, cryptoOfferData, userId);

    } catch (error) {

        return res.status(400).render('home', { error: getErrorMessaage(error) });

    }

    //check if owner?

    res.redirect(`/crypto/${cryptoOfferId}/details`);
});


router.get('/:cryptoOfferId/delete', isAutorized, async (req, res) => {
    const cryptoOfferId = req.params.cryptoOfferId;
    const userId = req.user._id;


    //don`t have confirm page for deleting cryptoOffer
    // res.render('crypto/delete')
    try {

        const cryptoOfferData = await cryptoService.getOne(cryptoOfferId);
        if (cryptoOfferData.ownerId != userId) {
            throw new Error('Forbidden page!');
        }
        await cryptoService.delete(cryptoOfferId);

    } catch (error) {

        return res.status(400).render('home', { error: getErrorMessaage(error) });

    }
    //todo delete cryptoOffer
    res.redirect('/crypto/catalog')
});

router.post('/create', isAutorized, async (req, res) => {//isAutorized routeguard

    const cryptoOfferData = req.body;
    const ownerId = req.user._id;
    console.log(ownerId);

    try {

        await cryptoService.create(ownerId, cryptoOfferData);

    } catch (error) {
        return res.status(400).render('crypto/create', { error: getErrorMessaage(error) });
    }
    res.redirect('/crypto/catalog');
});


module.exports = router;