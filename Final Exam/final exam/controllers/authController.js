const authController = require('express').Router();
const { body, validationResult } = require('express-validator');
const { register, login } = require('../services/userService');
const { parseError } = require('../util/parser');
const { isGuest, isUser } = require('../middlewares/guardsMW');

authController.get('/register', isGuest(), (req, res) => {
    res.render('register', {
        title: 'Register Page'
    });
});

authController.post('/register', isGuest(),
    body('email').isEmail().withMessage('Please provide a valid email address')
        .isLength({ min: 10 }).withMessage('Email should be at least 10 characters long!'),
    body('password')
        .isLength({ min: 4 }).withMessage('Password should be at least 4 characters long!'),

    async (req, res) => {

        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors
            }
            const { email, password, repass } = req.body;

            if (password !== repass) {
                throw new Error('Passwords don\'t match!')
            }

            const token = await register(email, password);
            res.cookie('token', token);

            res.redirect('/');
        } catch (error) {
            const errors = parseError(error);
            res.render('register', {
                title: 'Register Page',
                errors,
                body: {
                    email: req.body.email
                }
            });
        }
    });

authController.get('/login', isGuest(), (req, res) => {
    res.render('login', {
        title: 'Login Page',
    })
});
authController.post('/login', isGuest(), async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await login(email, password);

        res.cookie('token', token);
        res.redirect('/')

    } catch (error) {
        const errors = parseError(error);
        res.render('login', {
            title: 'Login Page',
            errors,
            body: {
                email: req.body.email
            }
        })
    }
});

authController.get('/logout', isUser(), (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})

module.exports = authController;