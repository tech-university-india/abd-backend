const router = require('express').Router();
const {
  listPoNotes,
  createPoNote,
  detailPoNote,
  editPoNote,
  deletePoNote
} = require('../../controllers/poNotes.controller');


router.get('', listPoNotes);
router.post('', createPoNote);

router.get('/:id', detailPoNote);
router.patch('/:id', editPoNote);
router.delete('/:id', deletePoNote);

module.exports = router;
