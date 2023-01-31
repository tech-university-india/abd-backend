const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Agile Dashboard',
    version: '0.0.1',
    description: 'Agile Dashboard API',
  },
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, 'routes/api/**/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = {swaggerSpec};
