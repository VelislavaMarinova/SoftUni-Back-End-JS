const router = require('express').Router();

const { getErrorMessaage } = require('../utils/errorUtils');
const authService = require('../services/authService');
const { isAutorized } = require('../middlewares/authMW');
const { default: mongoose } = require('mongoose');


router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;

    try {
        //if we don`t have login autmatically
        //await authService.register(username, email, password, repeatPassword);

        // if we have login automativcally after register
        const token = await authService.register(username, email, password, repeatPassword);
        //todo login automatically
        res.cookie('auth', token);
        res.redirect('/');

    } catch (error) {

        return res.status(400).render('auth/register', { error: getErrorMessaage(error) });

    }

});

router.get('/login', (req, res) => {
    res.render('auth/login');
});


router.post('/login', async (req, res) => {
    //get variables from the form name="";
    const { email, password } = req.body;
    try {

        const token = await authService.login(email, password);
        res.cookie('auth', token);
        res.redirect('/');

    } catch (error) {
        return res.status(404).render('auth/login', { error: getErrorMessaage(error) });
    }
});

router.get('/logout', isAutorized, (req, res) => {//isAutorized checks if you are loggedin
    res.clearCookie('auth');
    res.redirect('/');
});
module.exports = router;