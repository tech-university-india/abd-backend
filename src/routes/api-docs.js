const swaggerUi = require('swagger-ui-express');
const router = require('express').Router();
const  YAML = require('yamljs');

const swaggerSpec = YAML.load('./open_api_schema.yaml');

router.use('', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
module.exports = router;
