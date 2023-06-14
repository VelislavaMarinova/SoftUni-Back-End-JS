const { Schema, Types, model } = require('mongoose');

const playSchema = new Schema({
    title: {
        type: String,
        required: [true,'Title is required!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        maxLength: [50, 'Description maximum length is 50 symbols!']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required!']
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: String,
        required: true,
        default: formatDateWithNumbers = (date) => {
            date = new Date
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');

            return `${year}-${month}-${day}`;
        }

    },
    likes: {
        type: [Types.ObjectId],
        ref: 'User',
        default: []
    },
   likesCount:{
        type: Number,
        default: 0
    },
    ownerId: {
        type: Types.ObjectId,
        ref: 'User'
    }

});

const Play = model('Play', playSchema);
module.exports = Play;
