const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const {swaggerSpec} = require('../swagger');
router.use('', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
module.exports = router;
