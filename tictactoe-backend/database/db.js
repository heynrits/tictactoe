const mongoose = require('mongoose');

const connect = async () => {
    const DB_HOST = process.env.DB_HOST || 'mongodb://127.0.0.1:27017/';
    const DB_NAME = process.env.DB_NAME || 'test';
    
    await mongoose.connect(`${DB_HOST}${DB_NAME}`);
};

exports.connect = connect;