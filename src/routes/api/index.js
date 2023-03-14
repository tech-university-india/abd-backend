const express = require('express');
const { authMiddleware } = require('../../middlewares/auth');
const router = express.Router();

router.use(authMiddleware);

router.use('/po-notes', require('./poNotes.routes'));
router.use('/dsm/celebrations', require('./dsm/celebrationBoard.routes'));
router.use('/dsm/announcements', require('./dsm/announcements.routes'));

module.exports = router;
