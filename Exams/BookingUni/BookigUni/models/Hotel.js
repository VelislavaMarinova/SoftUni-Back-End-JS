const mongoose = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+/i;
const hotelShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, 'Hotel must be at least 4 character long'],
    },
    city: {
        type: String,
        required: true,
        minlength: [3, 'City must be at least 4 character long'],

    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: 'ImageUrl is not valid',
        }
    },
    rooms: {
        type: Number,
        required: true,
        min: [1, 'Rooms must be between 1 and 100'],
        max: [100, 'Rooms must be between 1 and 100']
    },
    bookings: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
      }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

hotelShema.index({ name: 1 }, {
    collation: {
        locale: 'en',
        strength: 2,
    }
});

const Hotel = mongoose.model('Hotel', hotelShema);
module.exports = Hotel