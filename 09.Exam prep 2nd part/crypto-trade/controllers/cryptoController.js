const router = require('express').Router();

const { log } = require('handlebars');
const { isAutorized } = require('../middlewares/authMW');
const cryptoService = require('../services/cryptoService');
const { getErrorMessaage } = require('../utils/errorUtils');


router.get('/catalog', async (req, res) => {
    
    try {
        const allCryptoOffers = await cryptoService.getAll().lean();
        res.render('crypto/catalog', { allCryptoOffers });
        
    } catch (error) {

        return res.status(400).render('crypto/catalog', { error: getErrorMessaage(error) });
        
    }
})

router.get('/create', isAutorized, (req, res) => {//isAutorized routeguard
    res.render('crypto/create');
});

router.post('/create', isAutorized, async (req, res) => {//isAutorized routeguard

    const cryptoData = req.body;
    const ownerId = req.user._id;
    console.log(ownerId);

    try {

        await cryptoService.create(ownerId, cryptoData);

    } catch (error) {
        return res.status(400).render('crypto/create', { error: getErrorMessaage(error) });
    }
    res.redirect('/crypto/catalog');
});


module.exports = router;