const { register,login } = require('../services/userService');
const authController = require('express').Router();
const { parseError } = require('../util/parser')

authController.get('/register', (req, res) => {
    //TODO replace actual view
    res.render('register', {
        title: 'Register Page'
    });
});

authController.post('/register', async (req, res) => {

    try {
        const { username, password, repass } = req.body;
        if (username == '' || password == '') {
            throw new Error('All fields are required!');
        }
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

authController.get('/login', (req, res) => {
    //TODO replace with actual view
    res.render('login', {
        title: 'Login Page',
    })
});
authController.post('/login', async (req, res) => {
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

authController.get('/logout',(req,res) =>{
    res.clearCookie('token');
    res.redirect('/');
})

module.exports = authController;