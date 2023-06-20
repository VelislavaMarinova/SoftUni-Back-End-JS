const express = require('express');

const app = express();

const products = [
    {
        id: 'asd1',
        name: 'Pr 1',
        price: 2
    },
    {
        id: 'asd2',
        name: 'Pr 2',
        price: 5
    },
    {
        id: 'asd3',
        name: 'Pr 3',
        price: 6
    }];

app.use(express.static('static'));
app.use(express.json())

app.get('/data', (req, res) => {
    console.log('req');

    res.json(products);
});

app.post('/data', (req, res) => {
    const record = {
        id: Math.random(),
        name: req.body.name,
        price: Number(req.body.price),
    }
    console.log(req.body);
    products.push(record)
    res.status(201).json(record);
});

app.get('/data/:id', (req, res) => {
    const item = products.find(x => x.id == req.params.id);
    res.json(item)
});

app.delete('/data/:id', (req, res) => {
    const itemIndex = products.findIndex(x => x.id == req.params.id);
    products.splice(itemIndex, 1);
    res.status(202).end();
});

app.put('/data/:id', (req, res) => {
    const item = products.find(x => x.id == req.params.id);
    item.name = req.body.name;
    item.price = Number(req.body.price);

    res.status(202).end();
})

app.listen(3000, console.log('Server is listening on port 3000'));