const express = require('express');
const handlebars = require('express-handlebars');
const mongoose =  require('mongoose');
const cookieParser = require('cookie-parser');
const {authenticationMW}=require('./middlewares/authMW');


const routes = require('./routes');

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.use(express.static('public'));
// app.use(express.static('./public'));//correct path in main.hbs and others

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authenticationMW);//!! place exact here
app.use(routes);


mongoose.set('strictQuery', false);
//change data base name crypto
mongoose.connect('mongodb://127.0.0.1:27017/book-review');
console.log('DB connected');


app.listen(5000, () => {
    console.log('Server is listening on port 5000...');
})