const { Schema, model, Types } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+/i;

const courseSchema = new Schema({
    title: {
        type: String,
        // required: true,//this is done with use minLength
        minLength: [4, 'Course title must be at least 4 characters long!']
    },
    description: {
        type: String,
        // required: true,//this is done with use minLength
        minLength: [20, 'Course description must be at least 20 charachters long!'],
        maxLength: [50, 'Course description must be at most 50 charachters long!']

    },
    imageUrl: {
        type: String,
        // required: true,// URL_PATTERN.test(value) wont pass "" to be valid
        validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: 'ImageUrl is not valid',
        }

    },
    duration: {
        type: String,
        required: [true, 'Duration is required!']
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
    users: {
        type: [Types.ObjectId],
        ref: 'User',
        default: []
    },
    usersCount:{
        type: Number,
        default: 0
    },
    ownerId: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

courseSchema.index({ title: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const Course = model('Course', courseSchema);

module.exports = Course;
