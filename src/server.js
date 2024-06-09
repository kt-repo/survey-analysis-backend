// src/server.js
const app = require('./app');
const config = require('./config');

const port = config.port;

app.listen(port, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`);
});
