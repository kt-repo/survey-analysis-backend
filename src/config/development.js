// src/config/development.js
require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    dbConnectionString: process.env.DB_CONNECTION_STRING,
    jwtSecret: process.env.JWT_SECRET
};
