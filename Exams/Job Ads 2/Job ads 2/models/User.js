const { Schema, model } = require('mongoose');
//TODO add User prps and validation
const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true,
    },
    hashedPassword: {
        type: String,
        required:[true, 'Password is required!']
    },
    skills: {
        type: String,
        required: [true,'Description of skills is required!']
    }

});

userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;