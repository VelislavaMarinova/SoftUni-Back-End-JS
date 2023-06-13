const authController = require('express').Router();
const { body, validationResult } = require('express-validator');
const { register, login } = require('../services/userService');
const { parseError } = require('../util/parser');
const { isGuest } = require('../middlewares/guardsMW');

authController.get('/register',isGuest(), (req, res) => {
    //TODO replace actual view
    res.render('register', {
        title: 'Register Page'
    });
});

authController.post('/register',isGuest(),
    //TODO check requirement for length;
    // body('email').isEmail().withMessage('Please provide a valid email address'),
    body('username')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long!')
        .isAlphanumeric().withMessage('Username may contain only english letters and numbers!'),
    body('password')
        .isLength({ min: 3 }).withMessage('Password must be at least 3 characters long!')
        .isAlphanumeric().withMessage('Password may contain only english letters and numbers!'),

    async (req, res) => {

        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors
            }
            const { username, password, repass } = req.body;
            // replaced by express-validator
            // if (username == '' || password == '') {
            //     throw new Error('All fields are required!');
            // }

            if (password !== repass) {
                throw new Error('Passwords don\'t match!')
            }

            const token = await register(username, password);
            //TODO check assignment to see if register creates session
            res.cookie('token', token);

            //TODO Check redirection to!
            res.redirect('/');
        } catch (error) {
            console.log(error);
            const errors = parseError(error);
            //TODO add error display to actual template
            res.render('register', {
                title: 'Register Page',
                errors,
                body: {
                    username: req.body.username
                }
            });
        }
    });

authController.get('/login',isGuest(), (req, res) => {
    //TODO replace with actual view
    res.render('login', {
        title: 'Login Page',
    })
});
authController.post('/login',isGuest(), async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await login(username, password);

        res.cookie('token', token);
        //TODO Check redirection to!
        res.redirect('/')

    } catch (error) {
        const errors = parseError(error);
        //TODO add error display to actual template
        res.render('login', {
            title: 'Login Page',
            errors,
            body: {
                username: req.body.username
            }
        })
    }

});

authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})

module.exports = authController;