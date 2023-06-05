const authController = require('express').Router();
const validator = require('validator');
const { register, login } = require('../services/userService');
const { parseError } = require('../util/parser')

authController.get('/register', (req, res) => {
    //TODO replace actual view
    res.render('register', {
        title: 'Register Page'
    });
});

authController.post('/register', async (req, res) => {

    try {
        const { email, username, password, repass } = req.body;
        console.log(req.body);
        if (validator.isEmail(email) == false) {
            throw new Error('Invalid email!')
        }
        if (username == '' || password == '') {
            throw new Error('All fields are required!');
        }
        if(password.length<5){
            throw new Error('Password must be at least 5 characters long!')
        }
        if (password !== repass) {
            throw new Error('Passwords don\'t match!')
        }

        const token = await register(email, username, password);
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
                email: req.body.email,
                username: req.body.username
            }
        });
    }
});

authController.get('/login', (req, res) => {
    //TODO replace with actual view
    res.render('login', {
        title: 'Login Page',
    })
});
authController.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await login(email, password);

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
                email: req.body.email
            }
        })
    }

});

authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})

module.exports = authController;