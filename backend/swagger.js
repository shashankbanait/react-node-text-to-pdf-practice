const PORT = 5000;
// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Define the Swagger options
const swaggerOptions = {
    definition: {
        openapi: '3.0.0', // Swagger version
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'A simple Express API'
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Local server'
            }
        ]
    },
    apis: ['./index.js'] // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = {
    swaggerUi,
    swaggerSpec
};
