const router = require('express').Router();

const { isAutorized } = require('../middlewares/authMW');// for routeguard

const bookService = require('../services/bookService');
const { getErrorMessaage } = require('../utils/errorUtils');


router.get('/catalog', async(req, res) => {
    try {
        const allBookReviews = await bookService.getAll().lean();
        res.render('book/catalog', { allBookReviews });

    } catch (error) {

        return res.status(400).render('crypto/catalog', { error: getErrorMessaage(error) });

    }
})

router.get('/create', isAutorized, async (req, res) => {//isAutorized routeguard
    res.render('book/create');
});
router.post('/create', isAutorized, async (req, res) => {//isAutorized routeguard

    const bookReviewData = req.body;
    const ownerId = req.user._id;

    try {

        await bookService.create(ownerId, bookReviewData);

    } catch (error) {
        return res.status(400).render('book/create', { error: getErrorMessaage(error) });
    }
    res.redirect('/book/catalog');
});

router.get('/:bookReviewId/details', async (req, res) => {

    const bookReviewId = req.params.bookReviewId
    // console.log(cryptoOfferId);
    const selectedBookReview = await bookService.getOne(bookReviewId).lean();

    //if user is not logged in req.user._id ===undefined !!!
    let userId = '';
    if (req.user) {
        userId = req.user._id;
    }
    // console.log(oneCryptoOffer.ownerId);
    //!!!oneCryptoOffer.ownerId = new ObjectId("647496c025714f6d9223b931")so don't use ===
    const isOwner = userId == selectedBookReview.ownerId;
    // console.log(isOwner);
    //const isBuyer = oneCryptoOffer.buyers.some(id => id == userId);//returns true/false - boolean

    //const isOwner = req.user?._id === oneCryptoOffer.ownerId
    // console.log(oneCryptoOffer);
    res.render('book/details', { selectedBookReview, isOwner })
});


module.exports = router;