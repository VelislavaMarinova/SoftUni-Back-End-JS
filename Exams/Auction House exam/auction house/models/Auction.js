const { Schema, Types, model } = require('mongoose');

const auctionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        minLength: [4, 'Title should be at least 4 characters long!']

    },
    description: {
        type: String,
        maxLength: [20, 'The description should be a maximum of 200 characters long!']

    },
    category: {
        type: String,
        required: [true, 'Category is required!'],
        enum: {
            values: ['vehicles', 'estate','furniture', 'electronics',  'other'],
           // message: 'Invalid platform!',
        },
    },
    imageUrl: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        min: [0, 'The price cannot be negative number!']
    },
    ownerId: {
        type: Types.ObjectId,
        ref: 'User'
    },
    author: {
        type: String,
        ref: 'User'
    },
    bidder: {
        type: Types.ObjectId,
        ref: 'User',
    },
    bidderName: {
        type: String,
        ref: 'User',
    }, auctionIsClosed:{
        type: Boolean, 
        default: false,
    }

});

const Auction = model('Auction', auctionSchema);
module.exports = Auction;