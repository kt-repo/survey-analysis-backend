// src/middleware/corsMiddleware.js

const corsMiddleware = require('cors');

const corsOptions = {
    origin: '*', // You can specify specific domains here
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

module.exports = corsMiddleware(corsOptions);