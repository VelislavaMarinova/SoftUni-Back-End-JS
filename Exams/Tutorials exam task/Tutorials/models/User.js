const { Schema, model } = require('mongoose');
//TODO add User prps and validation
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, 'Username must be at least 3 charachters long!']
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

const User = model('User', userSchema);

module.exports = User;