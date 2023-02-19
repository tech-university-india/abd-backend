const express = require('express');
const router = express.Router();


router.use('/po-notes', require('./poNotes.routes'));
router.use('/dsm/announcements',require('./dsm/announcements.routes'));
router.use('/dsm-sentiment-meter',require('./dsm/sentimentMeter.routes'));

module.exports = router;
