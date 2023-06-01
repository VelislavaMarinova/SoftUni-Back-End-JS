const router = require('express').Router();

const { isAutorized } = require('../middlewares/authMW');// for routeguard

const bookService = require('../services/bookService');
const { getErrorMessaage } = require('../utils/errorUtils');


router.get('/catalog',(req,res)=>{
    res.render('book/catalog')
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

// router.get('/catalog', async (req, res) => {

//     try {
//         const allCryptoOffers = await cryptoService.getAll().lean();
//         res.render('crypto/catalog', { allCryptoOffers });

//     } catch (error) {

//         return res.status(400).render('crypto/catalog', { error: getErrorMessaage(error) });

//     }
// });


module.exports = router;