const express = require('express');
const router = express.Router();


router.use('/po-notes', require('./poNotes.routes'));

module.exports = router;
