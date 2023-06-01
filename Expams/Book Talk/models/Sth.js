const mongoose = require('mongoose');

const SthSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: {
            values: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
            message: 'Invalid payment ,ethod',
        },
        required: true,
    },
    owner: {//many crypto for one user / many to 1
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }

});

const Sth = mongoose.model('CryptoOffer', SthSchema);

module.exports = Sth;