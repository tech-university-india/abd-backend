const router = require('express').Router();
const { listTeamRequests, createTeamRequest, editTeamRequest, deleteTeamRequest } = require('../../../controllers/dsm/teamRequests.controller');
const { generateValidationMiddleware } = require('../../../middlewares/validation');
const requestSchema = require('../../../schemas/dsm/teamRequests.schema');
const { paramParser } = require('../../../middlewares/paramParser');
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
 *                  description: author of team request 
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
 *             - MEETING
 *             - RESOURCE
 *         description: Type of team request
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: start Date of team request
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: end Date of team request
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in team request
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - PENDING
 *             - APPROVED
 *             - REJECTED
 *         description: Status of team request  
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: author of team request  
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
 *                 type: string
 *                 description: author of team request 
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
  .get(generateValidationMiddleware(requestSchema.dsmRequestQuerySchema,'query'),listTeamRequests)
  .post(generateValidationMiddleware(requestSchema.createValidTeamRequest), createTeamRequest);
/**
 * @openapi
 * /api/dsm/team-requests/{requestId}:
 *   put:
 *     tags:
 *       - team-requests
 *     summary: Create a team request
 *     description: Create a team request
*     parameters:
 *       - in: path
 *         name: requestId
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
 *                 type: string
 *                 description: author of team request 
 *               content:
 *                 type: string
 *                 description:  Content of the note
 *               type:
 *                 type: string
 *                 description: Type of the team request
 *                 enum:
 *                   - RESOURCE
 *                   - MEETING
 *               status:
 *                 type: string
 *                 description: Status of the team request
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
 *         name: requestId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique identifier of the team request
 *     responses:
 *       204:
 *         description: team request deleted successfully
 *       400:
 *         description: Bad request if not acceptable requestId is passed
 *       404:
 *         description: Not found if no team request found with requestIdd
 *       500:
 *         description: Internal server error
*/
const requiredParams = {
  requestId: 'number'
};
const paramParsingMiddleware = paramParser(requiredParams);
router.route('/:requestId')
  .put(paramParsingMiddleware,generateValidationMiddleware(requestSchema.editTeamRequest), editTeamRequest)
  .delete(paramParsingMiddleware,generateValidationMiddleware(requestSchema.deleteTeamRequest), deleteTeamRequest);
module.exports = router;