const express = require('express');
const cookieParser = require('cookie-parser')

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/login', (req, res) => {
    res.send(`
    <form action="" method="POST">
        <label for="username">Username</label>
        <input type="text" name="username" id="username">
        <label for="password">Password</label>
        <input type="password" id="password" name="password">
        <input type="submit" value="submit">
    </form>
    `)
});

app.get('/', (req, res) => {
    res.send(
        `<h1>Hello</h1>
        <ul>
            <li><a href="/login">Login</a></li>
            <li><a href="/profile">Profile</a></li>
         </ul>

`    )
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'Ivan' && password === 'ivan') {
        const authData = {
            username: "Ivan",
        }
        res.cookie('auth', JSON.stringify(authData));
        return res.redirect('/');
    }

    res.status(401).end();
});

app.get('/profile', (req, res) => {
    //check if user is logged
    const authData = req.cookies['auth'];
    if (!authData) {
        return res.status(401).end();
    }
    const {username} = JSON.parse(authData);

    console.log(username);
    res.send(`<h2>Hello-${username}</h2>`);

});

app.listen(5000, () => console.log("server 5000"));