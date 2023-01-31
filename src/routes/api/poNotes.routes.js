const router = require('express').Router();
const {
  listPONotes,
  createPONote,
  detailPONote,
  editPONote,
  deletePONote
} = require('../../controllers/poNotes.controller');

/**
 * @openapi
 * components:
 *   schemas:
 *     PoNote:
 *       type: object
 *       required:
 *         - noteId
 *         - type
 *         - status
 *         - note
 *       properties:
 *         noteId:
 *           type: integer
 *           description: Unique identifier of the note
 *         type:
 *           type: string
 *           description: Type of the note
 *           enum:
 *             - ACTION_ITEM
 *             - KEY_DECISION
 *             - AGENDA_ITEM
 *         status:
 *           type: string
 *           description: Status of the note
 *           enum:
 *             - COMPLETED
 *             - PENDING
 *             - NONE
 *         note:
 *           type: string
 *           description: Po Note
 *         issueLink:
 *           type: string
 *           format: uri
 *           description: Issue link
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Created at
 *         dueDate:
 *           type: string
 *           format: date
 *           description: Due date
*/

router.get('', listPONotes);
router.post('', createPONote);

router.get('/:id', detailPONote);
router.patch('/:id', editPONote);
router.delete('/:id', deletePONote);

module.exports = router;
