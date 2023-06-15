const { Schema, Types, model } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+/i;
const photoShema = new Schema({
    name: {
        type: String,
        required: [true,'Name is required'],
        minlength: [2, 'Name should be at least 2 character long'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required!'],
        validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: 'ImageUrl is not valid',
        }
    },
    age: {
        type: Number,
        min: [1, 'The age should be a number from 1 to 100!'],
        max: [100, 'The age should be a number from 1 to 100!'],
        required: [true,'Age is required!']
    },
    description: {
        type: String,
        // required: true,//this is done with use minLength
        minLength: [5, 'Photo description should be at from 5 to 50 charachters long!'],
        minLength: [5, 'Photo description should be at from 5 to 50 charachters long!'],
    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
        minLength: [5, 'Photo location should be at from 5 to 50 charachters long!'],
        minLength: [5, 'Photo location should be at from 5 to 50 charachters long!'],
    },
    ownerId: {
        type: Types.ObjectId,
        ref: 'User'
    },
    ownerUsername:{
        type:String,
        ref: 'User'
    },

    commentList: [{ type: Object, ref: "User" }],


});

const Photo = model('Photo', photoShema);
module.exports = Photo;
