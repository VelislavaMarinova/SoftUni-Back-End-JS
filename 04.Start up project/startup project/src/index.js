const express = require ('express');
const config = require('./config');
const handlebars= require('express-handlebars');

const app = express();
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    //  layoutsDir:"sth"
    }));
app.set('view engine', 'hbs');
app.set('views','./src/views');
;

app.get('/',(req,res)=>{
    res.render('home');
});

app.listen(config.PORT,()=>console.log(`port ${config.PORT}...`));