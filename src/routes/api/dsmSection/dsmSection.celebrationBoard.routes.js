const router = require('express').Router();
const {
  listCelebrations,
  detailCelebration,
  createCelebration,
  updateCelebration,
  deleteCelebration
} = require('../../../controllers/dsmSection/dsmSection.celebrationBoard.controller');

// GET /api/dsm-celebration
router.get('/', listCelebrations);

// POST /api/dsm-celebration
router.post('/', createCelebration);

// GET /api/dsm-celebration/:id
router.get('/:id', detailCelebration);

// PUT /api/dsm-celebration/:id
router.put('/:id', updateCelebration);

// DELETE /api/dsm-celebration/:id
router.delete('/:id', deleteCelebration);

module.exports = router;