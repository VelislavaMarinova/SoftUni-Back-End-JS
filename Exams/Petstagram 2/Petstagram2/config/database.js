const mongoose = require('mongoose');
//TODO change dbName
const CONNECTION_STRING = 'mongodb://localhost:27017/petstagram2'

module.exports = async (app) => {
    try {
        await mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB connected');
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}