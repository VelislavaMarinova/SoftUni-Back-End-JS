const express = require('express');
const hbs = require('express-handlebars');
const app = express();


app.engine('hbs', hbs.engine());
app.set('view engine', 'hbs');

// app.get('/', (req, res) => {
//     res.send(`<h1>Hello from Express</h1>
//     <a href="/cats">Cats</a>`);
// });
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/cats', (req, res) => {
    const cats=[
    {
        id: 1,
        name: "Bobi",
        breed: "Bombay Cat",
        description: "Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho."
    },
    {
        id: 2,
        name: "Tomi",
        breed: "Bombay Cat",
        description: "Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho."
    },
    {
        id: 3,
        name: "Jerry",
        breed: "Bombay Cat",
        description: "Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho."
    },
    {
        id: 4,
        name: "Kitie",
        breed: "Bombay Cat",
        description: "Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho."
    },
    {
        id: 5,
        name: "Domi",
        breed: "Bombay Cat",
        description: "Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho."
    },
    {
        id: 6,
        name: "Roni",
        breed: "Bombay Cat",
        description: "Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho."
    }
]
    res.render('cats',{cats});
  
});


// app.get('/cats', (req, res) => {
//     res.send(`<h1>Cats Page</hq>`)
// });

let validateCatId = (req, res, next) => {
    let catId = Number(req.params.catId);
    if (!catId) {
        return res.send('Invalid Id');
    } else {
        next()
    }
};

//middleware
app.get('/cats/:catId', validateCatId, (req, res) => {
    // res.send(`<h1>One cat ${req.params.catID}</h1>`);
    res.render('cat', { id: req.params.catId })
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