const { Schema, model } = require('mongoose');
//TODO add User prps and validation
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        //use validator for email validate
       // match: [/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/i, 'Email may contain only english and numbers']
    },
    username: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9]+$/i, 'Username may contain only english and numbers']
    },
    hashedPassword: {
        type: String,
        required: true
    },

});

userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
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