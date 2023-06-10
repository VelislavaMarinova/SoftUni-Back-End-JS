const { Schema, Types, model } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+/i;
const gameShema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: [4, 'Game must be at least 4 character long'],
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: 'ImageUrl is not valid',
        }
    },
    price: {
        type: Number,
        min:[0, 'The price should be a positive number!'],
        requred: true,
    },
    description: {
        type: String,
        // required: true,//this is done with use minLength
        minLength: [10, 'Game description should be at least 10 charachters long!'],
    },
    genre: {
        type: String,
        required: true,
        minLength: [2, 'Game genre should be at least 10 charachters long!'],

    },
    platform: {
        type: String,
        enum: {
            values: ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'],
            message: 'Invalid platform!',
        },
        required: true,
    },
    boughtBy: {
        type: [Types.ObjectId],
        ref: 'User',
        default: []
    },
    ownerId: {
        type: Types.ObjectId,
        ref: 'User'
    }

});

gameShema.index({ name: 1 }, {
    collation: {
        locale: 'en',
        strength: 2,
    }
});

const Game = model('Game', gameShema);
module.exports = Game;