const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home');
    console.log(req.user);
})

module.exports = router;