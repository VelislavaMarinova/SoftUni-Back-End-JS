const { Schema, Types, model } = require('mongoose');

const adSchema = new Schema({
    headline: {
        type: String,
        required: [true, 'Headline is required'],
        minlength: [4, 'Headline should be at least 4 character long'],
    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
        minlength: [8, 'Location should be at least 8 character long'],

    },
    companyName: {
        type: String,
        min: [3, 'The Company name should be at least 3 characters'],
        required: [true, 'Company name is required!']
    },
    companyDescription: {
        type: String,
        required: [true, 'Compamy description is required!'],
        maxLength: [40, 'The Company description should be a maximum of 40 characters long'],
    },
    author: {
        type: Types.ObjectId,
        ref: 'User'
    },
    applies: [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ],
});

const Ad = model('Ad', adSchema);
module.exports = Ad;
