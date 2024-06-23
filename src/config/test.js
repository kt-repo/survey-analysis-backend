require('dotenv').config({ path: '.env.test' });

module.exports = {
    port: process.env.PORT || 3000,
    dbConnectionString: process.env.DB_CONNECTION_STRING,
    jwtSecret: process.env.JWT_SECRET
};
