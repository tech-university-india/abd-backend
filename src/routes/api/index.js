const express = require('express');
const router = express.Router();


router.use('/po-notes', require('./poNotes.routes'));
router.use('/dsm-celebrations', require('./dsmSection/dsmSection.celebrationBoard.routes'));

module.exports = router;
