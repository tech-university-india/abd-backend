const router = require('express').Router();
const {
  listPONotes,
  createPONote,
  detailPONote,
  editPONote,
  deletePONote
} = require('../../controllers/poNotes.controller');


router.get('', listPONotes);
router.post('', createPONote);

router.get('/:id', detailPONote);
router.patch('/:id', editPONote);
router.delete('/:id', deletePONote);

module.exports = router;
