const { Schema, Types, model } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+/i;
const tripSchema = new Schema({
    start: {
        type: String,
        required: [true, 'Start point is required!'],
        minlength: [4, 'The Starting Point should be at least 4 character long'],
    },
    end: {
        type: String,
        required: [true, 'End point is required!'],
        minlength: [4, 'The End Point should be at least 4 character long'],

    },
    date: {
        type: String,
        required: [true, 'Date is required!'],

    },
    time: {
        type: String,
        required: [true, 'Time is required!'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Car image URL is required!'],
        validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: 'ImageUrl is not valid',
        }
    },
    brand:{
        type: String,
        required: [true, 'Car brand is required!'],
        minlength: [4, 'The Car Brand should be minimum 4 characters long!'],

    },
    seats: {
        type: Number,
        min: [0, 'The Seats should be positive number (from 0 to 4 inclusive)!'],
        max: [4, 'The Seats should be positive number (from 0 to 4 inclusive)!'],
        required: [true, 'Number of seats is required!'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'], 
        min: [1, 'The Price should be positive number (from 1 to 50 inclusive)!'],
        max: [50, 'The Price should be positive number (from 1 to 50 inclusive)!'],
    },
    description: {
        type: String,
        // required: true,//this is done with use minLength
        minLength: [10, 'The description should be at minimun 10 charachters long!'],
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    },
    buddies: [
        {type: String}
    ],

});

const Trip = model('Trip', tripSchema);
module.exports = Trip;
