const { Schema, model } = require('mongoose');
//TODO add User prps and validation
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hashedPassword: {
        type: String,
        required: true
    },
    skills:{
        type:String,
        required: [true,'Description of skills is required!']
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