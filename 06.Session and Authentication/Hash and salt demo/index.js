const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const db = require('./db.json');//require parse js file in js object
const { registerUser, loginUser } = require('./dataService')

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } //if use https: secure:true
}))

app.get('/login', (req, res) => {
    res.send(`
    <h1>Sign In</h1>
    <form action="" method="POST">
        <label for="username">Username</label>
        <input type="text" name="username" id="username">
        <label for="password">Password</label>
        <input type="password" id="password" name="password">
        <input type="submit" value="sign in">
    </form>
    `)
});

app.get('/', (req, res) => {
    res.send(
        `<h1>Hello</h1>
        <ul>
            <li><a href="/login">Login</a></li>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/register">Register</a></li>
            <li><a href="/logout">Logout</a></li>


         </ul>

`    )
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await loginUser(username, password)

        const authData = {
            username: user.username,
        }
        res.cookie('auth', JSON.stringify(authData));
        req.session.username = user.username;
        req.session.privateInfo = user.password;
        return res.redirect('/profile');
    } catch (error) {
        console.log(error);
        res.status(401).end();
    };

});

app.get('/register', (req, res) => {
    res.send(`  
    <h1>Sign Up</h1> 
    <form action="" method="POST">
        <label for="username">Username</label>
        <input type="text" name="username" id="username">
        <label for="password">Password</label>
        <input type="password" id="password" name="password">
        <input type="submit" value="sign up">
    </form>
    `)
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    await registerUser(username, password);
    res.redirect('/login');
});

app.get('/profile', (req, res) => {
    //check if user is logged
    const authData = req.cookies['auth'];
    if (!authData) {
        return res.status(401).end();
    }
    const { username } = JSON.parse(authData);

    // console.log(req.session);

    res.send(`<h2>Hello-${username}</h2>`);

});

app.get('/logout',(req,res)=>{
    res.clearCookie('auth');
    res.redirect('/');
});

app.listen(5000, () => console.log("server 5000"));