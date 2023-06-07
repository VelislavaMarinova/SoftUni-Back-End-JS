const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const sessionMW = require('../middlewares/sessionMW');
const trimBodyMW = require('../middlewares/trimBodyMW');


module.exports = (app) => {
    const hbs = handlebars.create({
        extname: 'hbs',
    });

    app.engine('.hbs', hbs.engine);
  
    app.set('view engine', '.hbs');

    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(sessionMW());
    app.use(trimBodyMW)
};