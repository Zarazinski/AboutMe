const mongoose = require('mongoose');

const DATABASE_URI = "mongodb://localhost:27017/aboutme";

const connectDatabase = () => {
    mongoose.connect(DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })

    mongoose.connection.on('connected', () => {
        console.log('Connection to the database opened');
    });

    mongoose.connection.on('reconnected', () => {
        console.log('Connection to the database re-established');
    });

    mongoose.connection.on('error', (err) => {
        console.error(`Couldn't connect to the database ${err}`);
    });

    return mongoose.connection;
};

module.exports = { connectDatabase }