const express = require('express');
const router = express.Router();
router.use('/po-notes', require('./poNotes.routes'));
router.use('/dsm/team-requests',require('./dsm/teamRequests.routes'))
router.use('/dsm/announcements',require('./dsm/announcements.routes'));
module.exports = router;
