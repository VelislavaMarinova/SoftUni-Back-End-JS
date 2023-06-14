const { Schema, model, Types } = require('mongoose')

const adSchema = new Schema({
    headline: {
        type: String,
        required: [true, 'Headline is required!'],
        min: [4, 'The Headline should be a minimum of 4 characters long!'],

    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
        min: [8, 'The Location should be a minimum of 8 characters long!']
    },
    companyName: {
        type: String,
        required: [true, 'Company name is required!'],
        min: [3, 'The Company name should be at least 3 characters!']

    },
    companyDescription: {
        type: String,
        required: [true, 'Company description is required!'],
        max: [40, 'The Company description should be a maximum of 40 characters long']

    },
    authorId: {
        type: Types.ObjectId,
        ref: 'User',
    },
    authorEmail: {
        type: String,
        ref: 'User'
    },
    usersApplied: {
        type: [Types.ObjectId],
        ref: 'User',
        default: []
    },
    usersAppliedData: [{
        type: Object,
        ref: "User"
    }]
    ,
    appliesCount: {
        type: Number,
        default: 0
    }
});

const Ad = model('Ad', adSchema);
module.exports = Ad;