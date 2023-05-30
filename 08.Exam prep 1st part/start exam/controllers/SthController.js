const router = require('express').Router();

const { isAutorized } = require('../middlewares/authMW');// for routeguard

router.get('/create', isAutorized, (req, res) => {//isAutorized routeguard
    res.render('sth/create');
});

router.post('/create', isAutorized, (req, res) => {//isAutorized routeguard

});


module.exports = router;