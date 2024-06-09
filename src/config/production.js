// src/config/production.js
require('dotenv').config({ path: '.env.production' });

module.exports = {
    port: process.env.PORT || 80,
    dbConnectionString: process.env.DB_CONNECTION_STRING,
    jwtSecret: process.env.JWT_SECRET
};
