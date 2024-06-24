// src/middleware/swaggerMiddleware.js

// swaggerConfig.js
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const swaggerOptions = {
    swaggerOptions: {
        url: '/swagger.yaml'
    }
};

module.exports = {
    serve: swaggerUi.serve,
    setup: swaggerUi.setup(swaggerDocument, swaggerOptions)
};
