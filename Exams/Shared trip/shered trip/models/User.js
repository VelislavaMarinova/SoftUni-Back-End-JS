const { Schema, model } = require('mongoose');
//TODO add User prps and validation
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true
    },
    gender:{
        type: String,
        enum: {
            values: ['male', 'female'],
            message: 'Invalid gender',
        },
        required: true,
    }

});

userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;