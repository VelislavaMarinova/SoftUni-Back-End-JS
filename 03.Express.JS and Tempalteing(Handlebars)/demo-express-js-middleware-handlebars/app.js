const express = require('express');
const hbs= require('express-handlebars');
const app = express();


app.engine('hbs',hbs.engine());
app.set('view engine','hbs');

// app.get('/', (req, res) => {
//     res.send(`<h1>Hello from Express</h1>
//     <a href="/cats">Cats</a>`);
// });
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/cats', (req, res) => {
    res.render('cats');
});

// app.get('/cats', (req, res) => {
//     res.send(`<h1>Cats Page</hq>`)
// });

let validateCatId = (req, res, next) => {
    let catId = Number(req.params.catID);
    if (!catId) {
       return res.send('Invalid Id');
    } else {
        next()
    }};

    //middleware
    app.get('/cats/:catID',validateCatId, (req, res) => {
    console.log(req.params);
    let catId = req.params
    res.send(`<h1>One cat ${req.params.catID}</h1>`);
});

app.get('/dogs', (req, res) => {
    res.send(`<h1>Dogs Page</hq>`)
});

app.post("/cats", (req, res) => {
    res.send('cat received');
});

app.put("/cats", (req, res) => {
    res.send('cat updated');
});

app.delete("/cats", (req, res) => {
    res.send('cat is deleted');
});

//generic route

app.get('/redirect', (req, res) => {
    res.redirect('/redirected');
});

app.get('/redirected', (req, res) => {
    res.send('<h1>this is redirected page<h1>')
})
app.get("*", (req, res) => {
    res.send('<h1>404</h1>');
});

app.listen(5000, () => {
    console.log('Server is listening on port 5000...');
})