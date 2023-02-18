const router = require('express').Router();
const { listTeamRequests, createTeamRequest, getTeamRequestById, editTeamRequest, deleteTeamRequest } = require('../../../controllers/dsm/teamRequests.controller');
const { parseIntIdParam } = require('../../../utils/paramsHandling');
const { generateValidationMiddleware } = require('../../../middlewares/validation')
const requestSchema = require('../../../schemas/dsm/teamRequests.schema');
/**
 * @openapi
 * components:
 *  schemas:
 *      team-requests:
 *          type: object
 *          required:
 *          - author
 *          - content
 *          - status
 *          - type
 *          - createdAt
 *          - taggedIndividuals
 *          properties:
 *              author:
 *                  type: string
 *                  description: The user ID of the author of the request
 *              content:
 *                  type: string
 *                  description: The content of the request
 *              status:
 *                  type: string
 *                  enum:
 *                      - PENDING
 *                      - APPROVED
 *                      - REJECTED
 *                  description: The status of the request
 *              type:
 *                  type: string
 *                  enum:
 *                      -RESOURCE
 *                      -MEETING
 *                  description: The type of the request
 *              createdAt:
 *                  type: string
 *                  format: date-time
 *                  description: The date and time the request was created
 *              taggedIndividuals:
 *                  type: array
 */
/**
 * @openapi
 * /api/dsm/team-requests:
 *   get:
 *     tags:
 *       - team-requests
 *     summary: List all team requests
 *     description: List all team requests
 *     responses:
 *       200:
 *         description: List of team requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/team-requests"
 *       500:
 *         description: Internal server error
 *   
 *   post:
 *     tags:
 *       - team-requests
 *     summary: Create a team request
 *     description: Create a team request
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
 *               author:
 *                 type: integer
 *                 description: User ID of the author
 *               content:
 *                 type: string
 *                 description:  Content of the note
 *               type:
 *                 type: string
 *                 description: Type of the request
 *                 enum:
 *                   - RESOURCE
 *                   - MEETING
 *     responses:
 *       201:
 *         description: request created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/team-requests"
 *       400:
 *         description: Bad request if invalid data is passed
 *       500:
 *         description: Internal server error
*/
router.route('')
    .get(listTeamRequests)
    .post(generateValidationMiddleware(requestSchema.createValidTeamRequest), createTeamRequest);
/**
 * @openapi
 * /api/dsm/team-requests/{id}:
 *   get:
 *     tags:
 *       - team-requests
 *     summary: List all team requests
 *     description: List all team requests
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique identifier of the request
 *     responses:
 *       200:
 *         description: List of team requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/team-requests"
 *       400:
 *         description: Bad request if invalid data is passed
 *       500:
 *         description: Internal server error
 *   put:
 *     tags:
 *       - team-requests
 *     summary: Create a team request
 *     description: Create a team request
*     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique identifier of the request
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
 *               author:
 *                 type: integer
 *                 description: User ID of the author
 *               content:
 *                 type: string
 *                 description:  Content of the note
 *               type:
 *                 type: string
 *                 description: Type of the request
 *                 enum:
 *                   - RESOURCE
 *                   - MEETING
 *               status:
 *                 type: string
 *                 description: Status of the request
 *                 enum:
 *                   - PENDING
 *                   - APPROVED 
 *                   - REJECTED
 *     responses:
 *       200:
 *         description: request updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/team-requests"
 *       400:
 *         description: Bad request if invalid data is passed
 *       500:
 *         description: Internal server error
 *   delete:
 *     tags:
 *       - team-requests
 *     summary: Delete a team request
 *     description: Delete a team request
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique identifier of the team request
 *     responses:
 *       204:
 *         description: team request deleted successfully
 *       400:
 *         description: Bad request if not acceptable id is passed
 *       404:
 *         description: Not found if no team request found with id
 *       500:
 *         description: Internal server error
*/
router.route('/:id')
    .get(parseIntIdParam,generateValidationMiddleware(requestSchema.getTeamRequestById), getTeamRequestById)
    .put(parseIntIdParam,generateValidationMiddleware(requestSchema.editTeamRequest), editTeamRequest)
    .delete(generateValidationMiddleware(requestSchema.deleteTeamRequest), deleteTeamRequest);
module.exports = router;
