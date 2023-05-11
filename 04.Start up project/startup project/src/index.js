const express = require('express');
const config = require('./config');

const app = express();

// require('./config/viewEngine')(app)  // or ===
const setupViewEngine=require('./config/viewEngine');
setupViewEngine(app);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(config.PORT, () => console.log(`port ${config.PORT}...`));