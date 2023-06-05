const bcrypt = require('bcrypt');

const User = require('../models/User');
const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../constants');



exports.findByUsername = (username) => User.findOne({ username });
exports.findByEmail = (email) => User.findOne({ email });

exports.register = async (email, username, password, repeatPassword) => {
    console.log(email, username, password, repeatPassword);
    //validate pass
    if (password !== repeatPassword) {
        throw new Error('Password missmatch!');
    }

    // todo: check if user exists
    //chek only username exists
    // const isExisting = await this.findByUsername(username);
    //check email or username exists

    const isExisting = await User.findOne({ $or: [{ email }, { username }] })
    if (isExisting) {
        throw new Error('User existists!')
    }
    //TODO: Validate password 

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);



    await User.create({ email, username, password: hashedPassword, repeatPassword });
  
    return this.login(email, password)//automatically login after register
};

exports.login = async (email, password) => {
    //user exists

    const user = await this.findByEmail(email);

    if (!user) {
        throw new Error('Invalid email ot password!');
    }
    //password isvalig
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid email ot password!');
    }

    //Generate token
    const payload = {
        _id: user._id,
        email,
        username: user.username
    }
    const token = await jwt.sign(payload, SECRET);

    return token;

}