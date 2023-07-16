const mongoose = require('mongoose');

const connect = async () => {
    const DB_HOST = process.env.DB_HOST || 'mongodb://127.0.0.1:27017/';
    const DB_NAME = process.env.DB_NAME || 'test';

    let dbConnectionStr = `${DB_HOST}${DB_NAME}`;
    if (ENVIRONMENT === 'production') {
        const DB_CLUSTER = process.env.DB_CLUSTER;
        const DB_NAME = process.env.DB_NAME;
        const DB_USERNAME = process.env.DB_USERNAME;
        const DB_PASSWORD = process.env.DB_PASSWORD;
        dbConnectionStr = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}.fcosuu8.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    }
    
    await mongoose.connect(dbConnectionStr);
};

exports.connect = connect;