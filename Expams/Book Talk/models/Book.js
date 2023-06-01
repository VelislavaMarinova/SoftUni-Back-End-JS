const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    image: {
        type: Number,
        required: true,
    },
   bookReview: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    stars: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 5,
    },
    // paymentMethod: {
    //     type: String,
    //     enum: {
    //         values: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
    //         message: 'Invalid payment ,ethod',
    //     },
    //     required: true,
    // },
    
    wishingList :[{
         type: mongoose.Types.ObjectId,
         ref: 'User'
     }],
    ownerId: {//many crypto for one user / many to 1
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },

});

const Book = mongoose.model('CryptoOffer', BookSchema);

module.exports = Book;