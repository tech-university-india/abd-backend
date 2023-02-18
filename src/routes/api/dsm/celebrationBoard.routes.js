const router = require('express').Router();
const {
  listCelebrations,
  detailCelebration,
  createCelebration,
  updateCelebration,
  deleteCelebration
} = require('../../../controllers/dsm/celebrationBoard.controller');

/**
 * @openapi
 * components:
 *   schemas:
 *     Celebration:
 *       type: object
 *       required:
 *         - celebrationId
 *         - author
 *         - content
 *         - createdAt
 *       properties:
 *         celebrationId:
 *           type: integer
 *           description: Unique identifier of the celebration
 *         author:
 *           type: string
 *           description: Author of the celebration
 *         content:
 *           type: string
 *           description: Content of the celebration
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Created at
 */


/**
 * @openapi
 * /api/dsm-celebration:
 *   get:
 *     summary: Get all celebrations
 *     tags:
 *       - dsm-celebration
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Celebration'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

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