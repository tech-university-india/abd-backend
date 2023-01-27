const express = require('express');
const router = express.Router();


router.use('/action-items', require('./actionItems.routes'));
// router.use('/key-decisions', require('./keyDecisions.routes'));
// router.use('/agenda-items', require('./agendaItems.routes'));


module.exports = router;
