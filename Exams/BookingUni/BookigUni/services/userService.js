const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'jahsdiaHSDI8Q979823792DNQJ';


const register = async (email, username, password) => {
    const existingUsername = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (existingUsername) {
        throw new Error('Username is taken!');
    };
    const existingEmail = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (existingEmail) {
        throw new Error('Email is taken!');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        username,
        hashedPassword,
    });

    //TODO see assignment if registration creates user session
    const token = createSession(user);
    return token;
}

const login = async (email, password) => {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (!user) {
        throw new Error('Incorrect email or password!');
    }
    const hasMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!hasMatch) {
        throw new Error('Incorrect email or password!');

    }
    const token = createSession(user);
    return token
}

const createSession = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username,
    };

    const token = jwt.sign(payload, JWT_SECRET);
    return token;
};

const veryfyToken = (token) => {
    return jwt.verify(token, JWT_SECRET)
};

module.exports = {
    register,
    login,
    veryfyToken,
};