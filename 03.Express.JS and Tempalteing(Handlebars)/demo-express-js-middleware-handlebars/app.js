const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send(`<h1>Hello from Express</h1>
    <a href="/cats">Cats</a>`);
});

app.get('/cats', (req, res) => {
    res.send(`<h1>Cats Page</hq>`)
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

app.delete("/cats",(req,res)=>{
    res.send('cat is deleted');
});

//generic route
app.get("*",(req,res)=>{
    res.send('<h1>404</h1>');
});


app.listen(5000, () => {
    console.log('Server is listening on port 5000...');
})