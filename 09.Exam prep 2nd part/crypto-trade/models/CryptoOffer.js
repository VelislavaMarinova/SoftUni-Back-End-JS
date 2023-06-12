const mongoose = require('mongoose');

const cryptoOfferSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        required: true,
    },
    image: {
        type: String,
        required: true,
        validate:{
            validator: function(value){
                return value.startsWith('http://')||value.startsWith('https://')
            },
            message: 'URL is invalid!'
        }
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    description: {
        type: String,
        minLength: 10,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: {
            values: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
            message: 'Invalid payment method!',
        },
        required: true,
    },
    ownerId: {//many crypto for one user / many to 1
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    buyers:[{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],

});

const CryptoOffer = mongoose.model('CryptoOffer', cryptoOfferSchema);

module.exports = CryptoOffer;