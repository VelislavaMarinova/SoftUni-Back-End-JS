const { Schema, Types, model } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+/i;
const animalSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minlength: [2, 'Name should be at least 2 character long'],
    },
    years: {
        type: Number,
        required: [true, 'Years are required!'],
        min: [1, 'The years should be a number between 1 and  100!'],
        max: [100, 'The years should be a number between 1 and  100!']

    },
    kind: {
        type: String,
        required: [true, 'Kind is required!'],
        minlength: [3, 'Kind should be at least 3 character long'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required!'],
        validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: 'Image Url is not valid',
        }
    },
    needs: {
        type: String,
        required: [true, 'Need is required!'],
        minlength: [3, 'The need should be at least 3 and no longer than 20 characters!'],
        maxlenght: [20, 'The need should be at least 3 and no longer than 20 characters!']

    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
        minlength: [5, 'The location should be at least 5 and no longer than 15 characters!'],
        maxlenght: [15, 'The location should be at least 5 and no longer than 15 characters!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minlength: [5, 'Description should be at from 5 to 50 charachters long!'],
        maxlenght: [50, 'Description should be at from 5 to 50 charachters long!'],

    },
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    },

    donations: [{ type: Object, ref: "User" }],
});

const Animal = model('Animal', animalSchema);
module.exports = Animal;
