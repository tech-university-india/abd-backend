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


/**
 * @openapi
 * /api/po-notes:
 *   get:
 *     tags:
 *       - po-notes
 *     summary: List all Po Notes
 *     description: List all Po Notes
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum:
 *             - ACTION_ITEM
 *             - KEY_DECISION
 *             - AGENDA_ITEM
 *         description: Type of Po Note
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Date of Po Note
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: start Date of Po Notes
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: end Date of Po Notes
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in po notes
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - COMPLETED
 *             - PENDING
 *             - NONE
 *         description: Status of Po Note
 *     responses:
 *       200:
 *         description: An array of po notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/PoNote"
 *       400:
 *         description: Bad request if invalid filters are passed
 *       404:
 *         description: Not found if no po notes found with filters
 *       500:
 *         description: Internal server error
 *   
 *   post:
 *     tags:
 *       - po-notes
 *     summary: Create a Po Note
 *     description: Create a Po Note
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - note
 *               - type
 *             properties:
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 description: Due date
 *               note:
 *                 type: string
 *                 description: Po Note
 *               type:
 *                 type: string
 *                 description: Type of the note
 *                 enum:
 *                   - ACTION_ITEM
 *                   - KEY_DECISION
 *                   - AGENDA_ITEM
 *     responses:
 *       201:
 *         description: Po Note created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/PoNote"
 *       400:
 *         description: Bad request if invalid data is passed
 *       500:
 *         description: Internal server error
*/
router.route('')
  .get(listPONotes)
  .post(createPONote);


/**
 * @openapi
 * /api/po-notes/{id}:
 *   get:
 *     tags:
 *       - po-notes
 *     summary: Get a Po Note
 *     description: Get a Po Note
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique identifier of the Po Note
 *     responses:
 *       200:
 *         description: Po Note found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/PoNote"
 *       400:
 *         description: Bad request if not acceptable id is passed
 *       404:
 *         description: Not found if no po note found with id
 *       500:
 *         description: Internal server error
 *   
 *   patch:
 *     tags:
 *       - po-notes
 *     summary: Partial update a Po Note
 *     description: Partial update a Po Note
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique identifier of the Po Note
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 description: Due date
 *               note:
 *                 type: string
 *                 description: Po Note
 *               type:
 *                 type: string
 *                 description: Type of the note
 *                 enum:
 *                   - ACTION_ITEM
 *                   - KEY_DECISION
 *                   - AGENDA_ITEM
 *               status:
 *                 type: string
 *                 description: Status of the note
 *                 enum:
 *                   - COMPLETED
 *                   - PENDING
 *                   - NONE
 *               issueLink:
 *                 type: string
 *                 format: uri
 *                 description: Issue link 
 *     responses:
 *       200:
 *         description: Po Note updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/PoNote"
 *       400:
 *         description: Bad request if invalid data is passed
 *       404:
 *         description: Not found if no po note found with id
 *       500:
 *         description: Internal server error
 *   
 *   delete:
 *     tags:
 *       - po-notes
 *     summary: Delete a Po Note
 *     description: Delete a Po Note
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique identifier of the Po Note
 *     responses:
 *       204:
 *         description: Po Note deleted successfully
 *       400:
 *         description: Bad request if not acceptable id is passed
 *       404:
 *         description: Not found if no po note found with id
 *       500:
 *         description: Internal server error
*/
router.route('/:id')
  .get(detailPONote)
  .patch(editPONote)
  .delete(deletePONote);

module.exports = router;
