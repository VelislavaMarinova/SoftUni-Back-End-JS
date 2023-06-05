const mongoose = require('mongoose');

function getFirstMongooseError(error) {
    const mongooseErrorMessages = Object.keys(error.errors).map(x => error.errors[x].message);
    return mongooseErrorMessages[0]
}

exports.getErrorMessaage = (error) => {
    console.log(error.name);
    switch (error.name) {
        case 'Error': 
            return error.message;
        case 'MongooseError':
            return getFirstMongooseError(error);
        case 'ValidationError':
            return getFirstMongooseError(error);
        default:
            return error.message
    }
    console.log(error instanceof Error);
    console.log(error instanceof mongoose.Error);
};