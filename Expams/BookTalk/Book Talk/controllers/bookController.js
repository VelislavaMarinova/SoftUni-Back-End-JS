const router = require('express').Router();

const { isAutorized } = require('../middlewares/authMW');// for routeguard

const bookService = require('../services/bookService');
const { getErrorMessaage } = require('../utils/errorUtils');


router.get('/catalog', async (req, res) => {
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

router.get('/:bookReviewId/edit', isAutorized, async (req, res) => {

    const bookReviewId = req.params.bookReviewId;
    const userId = req.user._id;

    try {
        const bookReviewData = await bookService.getOne(bookReviewId).lean();
        const isOwner = userId == bookReviewData.ownerId;
        console.log(isOwner);
        if (!isOwner) {
            // return
            throw new Error('Forbidden page!')
        }
        res.render('book/edit', { bookReviewData });

    } catch (error) {
        console.log(typeof error.message);
        if (error.message === "Forbidden page!") {
            return

        }

        return res.status(400).render('book/edit', { error: getErrorMessaage(error) });

    }

});

router.post('/:bookReviewId/edit', isAutorized, async (req, res) => {
    const bookReviewId = req.params.bookReviewId;
    const inputData = req.body;
    const userId = req.user._id;
    console.log(userId, bookReviewId, inputData);

    try {

        const selectedBookReview = await bookService.getOne(bookReviewId);
        const isOwner = userId == selectedBookReview.ownerId;

        if (!isOwner) {
            return
            // throw new Error('Forbidden page!');
        }
        await bookService.edit(bookReviewId, inputData);
    } catch (error) {
        // console.log(error);
        return res.status(400).render('book/edit', { error: getErrorMessaage(error) });
    }

    res.redirect(`/book/${bookReviewId}/details`);
});

router.get('/:bookReviewId/delete', isAutorized, async (req, res) => {
    const bookReviewId = req.params.bookReviewId;
    const userId = req.user_id;

    try {
        const selectedBookReviewData = await bookService.getAll(bookReviewId)
        const ownerId = selectedBookReviewData.ownerId;
        const isOwner = userId == ownerId;

        if (!isOwner) {
            return
        }

        await bookService.delete(bookReviewId);

    } catch (error) {

        return res.status(400).render('home', { error: getErrorMessaage(error) });

    }
    res.redirect('/book/catalog');

});


module.exports = router;