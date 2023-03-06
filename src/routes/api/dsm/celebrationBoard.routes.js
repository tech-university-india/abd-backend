const router = require('express').Router();
const {
  listCelebrations,
  detailCelebration,
  createCelebration,
  updateCelebration,
  deleteCelebration,
  updateReaction,
  getReaction
} = require('../../../controllers/dsm/celebrationBoard.controller');
const { generateValidationMiddleware } = require('../../../middlewares/validation');
const celebrationsSchema = require('../../../schemas/dsm/celebrationsSchema');

/**
 * @openapi
 * components:
 *  schemas:
 *   Celebration:
 *    type: object
 *    required:
 *    - celebrationId
 *    - author
 *    - content
 *    - type
 *    - createdAt
 *    properties:
 *     celebrationId:
 *      type: integer
 *      description: Unique identifier of the celebration
 *     author:
 *      type: string
 *      description: User id of the author
 *     isAnonymous:
 *      type: boolean
 *      description: Is the author anonymous
 *     content:
 *      type: string
 *      description: Content of the celebration
 *     type:
 *      type: string
 *      description: Type of the celebration
 *      enum:
 *       - CELEBRATION
 *       - IMPEDIMENT
 *     _count:
 *      type: object
 *      properties:
 *       reaction:
 *        type: integer
 *        description: Number of reactions
 *      required:
 *        - reaction
 *     createdAt:
 *      type: string
 *      format: date-time
 *      description: Created at
*/

/**
 * @openapi
 * /api/dsm/celebrations:
 *  get:
 *    tags:
 *      - celebrations
 *    summary: List celebrations
 *    description: List all the celebrations
 *    responses:
 *      '200':
 *        description: List of celebrations
 *        content:
 *          application/json:
 *            schema:
 *             type: array
 *             items:
 *                $ref: '#/components/schemas/Celebration'
 *      '500':
 *        description: Internal server error
 *  post:
 *    tags:
 *       - celebrations
 *    summary: Create a celebration
 *    description: Create an celebration
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            required:
 *              - content
 *              - type
 *              - isAnonymous
 *            properties:
 *             content:
 *              type: string
 *              description: Content of the celebration
 *             type:
 *              type: string
 *              description: Type of the celebration
 *             isAnonymous:
 *              type: boolean
 *              description: Is the author anonymous
 *    responses:
 *       '201':
 *         description: Celebration created
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/Celebration'
 *       '400':
 *         description: Bad request if unacceptable id is passed
 *       '500':
 *         description: Internal server error
*/

// GET /api/dsm/celebration
router.get('/', listCelebrations);

// POST /api/dsm/celebration
router.post('/', generateValidationMiddleware(celebrationsSchema.createCelebrationSchema), createCelebration);

/**
 * @openapi
 * /api/dsm/celebrations/{id}:
 *  get:
 *    tags:
 *      - celebrations
 *    summary: Get a celebration
 *    description: Get a celebration by id
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Unique identifier of the celebration
 *    responses:
 *      '200':
 *        description: Celebration found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Celebration'
 *      '400':
 *        description: Bad request if unacceptable id is passed
 *      '404':
 *        description: Not found if no celebration found with id
 *      '500':
 *        description: Internal server error
 *  patch:
 *    tags:
 *      - celebrations
 *    summary: Update a celebration
 *    description: Partial update an celebration
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Unique identifier of the celebration
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              content:
 *                type: string
 *                description: Content of the celebration
 *              type:
 *                type: string
 *                description: Type of the celebration
 *              isAnonymous:
 *                type: boolean
 *                description: Is the author anonymous
 *    responses:
 *      '200':
 *        description: Celebration updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Celebration'
 *      '400':
 *        description: Bad request if unacceptable id is passed
 *      '404':
 *        description: Not found if no celebration found with id
 *      '500':
 *        description: Internal server error
 *  delete:
 *    summary: Delete a celebration
 *    description: Delete a celebration by id
 *    tags:
 *      - celebrations
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Unique identifier of the celebration
 *    responses:
 *      '204':
 *        description: Celebration deleted
 *      '400':
 *        description: Bad request if unacceptable id is passed
 *      '404':
 *        description: Not found if no celebration found with id
 *      '500':
 *        description: Internal server error
*/

const paramValidationMiddleware = generateValidationMiddleware(celebrationsSchema.celebrationsParamSchema, 'params');

// GET /api/dsm/celebration/:id
router.get('/:id', paramValidationMiddleware, detailCelebration);

// PATCH /api/dsm/celebration/:id
router.patch('/:id', paramValidationMiddleware, generateValidationMiddleware(celebrationsSchema.patchcelebrationSchema), updateCelebration);

// DELETE /api/dsm/celebration/:id
router.delete('/:id', paramValidationMiddleware, deleteCelebration);

/**
 * @openapi
 * /api/dsm/celebrations/{id}/react:
 *  get:
 *    tags:
 *      - celebration reactions
 *    summary: Get a reaction of celebration
 *    description: Get a reaction by celebration id
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Unique identifier of the celebration
 *    responses:
 *      '200':
 *        description: Reaction found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Celebration'
 *      '400':
 *        description: Bad request if unacceptable id is passed
 *      '404':
 *        description: Not found if no celebration found with id
 *      '500':
 *        description: Internal server error
 *  patch:
 *    tags:
 *      - celebration reactions
 *    summary: Handle celebration reactions
 *    description: Partial update an celebration reaction
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Unique identifier of the celebration
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              isReacted:
 *                type: boolean
 *                description: Is the user reacted or unreacted to the celebration
 *      
 *    responses:
 *      '200':
 *        description: Reaction updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Celebration'
 *      '400':
 *        description: Bad request if unacceptable id is passed
 *      '404':
 *        description: Not found if no celebration found with id
 *      '500':
 *        description: Internal server error
*/

// GET /api/dsm/celebration/:id/react
router.get('/:id/react', paramValidationMiddleware, getReaction);

// PATCH /api/dsm/celebration/:id/react
router.patch('/:id/react', paramValidationMiddleware, generateValidationMiddleware(celebrationsSchema.patchReactionSchema), updateReaction);


module.exports = router;