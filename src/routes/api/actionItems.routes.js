const router = require('express').Router();
const {
  listActionItems,
  createActionItem,
  detailActionItem,
  editActionItem,
  deleteActionItem,
} = require('../../controllers/actionItems.controller');


router.get('', listActionItems);
router.post('', createActionItem);

router.get('/:id', detailActionItem);
router.patch('/:id', editActionItem);
router.delete('/:id', deleteActionItem);


module.exports = router;
