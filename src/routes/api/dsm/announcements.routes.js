const router = require('express').Router();
const {
  listAnnouncements,
  createAnnouncement,
  detailAnnouncement,
  editAnnouncement,
  deleteAnnouncement
} = require('../../../controllers/dsm/announcements.controller');
const { generateValidationMiddleware } = require('../../../middlewares/validation');
const announcementsSchema = require('../../../schemas/dsm/announcementsSchema');

/**
 * @openapi
 * components:
 *  schemas:
 *    Announcement:
 *      type: object
 *      required:
 *      - author
 *      - content
 *      - announcementId
 *      properties:
 *        announcementId:
 *          type: integer
 *          description: Unique identifier of the announcement
 *        author:
 *          type: integer
 *          description: User id of the author
 *        content:
 *          type: string
 *          description: Content of the announcement
 *        createdAt:
 *          type: string
 *          format: date-time
 *          description: Created at
*/

/**
 * @openapi
 * /api/dsm/announcements:
 *  get:
 *    tags:
 *      - announcements
 *    summary: List announcements
 *    description: List all the announcements
 *    responses:
 *      '200':
 *        description: List of announcements
 *        content:
 *          application/json:
 *            schema:
 *             type: array
 *             items:
 *                $ref: '#/components/schemas/Announcement'
 *      '500':
 *        description: Internal server error
 *  post:
 *    tags:
 *       - announcements
 *    summary: Create an announcement
 *    description: Create an announcement
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            required:
 *              - content
 *            properties:
 *             content:
 *              type: string
 *              description: Content of the announcement
 *    responses:
 *       '201':
 *         description: Announcement created
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/Announcement'
 *       '400':
 *         description: Bad request if unacceptable id is passed
 *       '500':
 *         description: Internal server error
*/

router.route('/')
  .get(listAnnouncements)
  .post(generateValidationMiddleware(announcementsSchema.createAnnouncementSchema), createAnnouncement);

const parseIntIdParam = (req, res, next) => {
  req.params.id = parseInt(req.params.id, 10);
  next();
};

const paramValidationMiddleware = generateValidationMiddleware(announcementsSchema.announcementsParamSchema, 'params');

/**
 * @openapi
 * /api/dsm/announcements/{id}:
 *  get:
 *    tags:
 *      - announcements
 *    summary: Get an announcement
 *    description: Get an announcement
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Unique identifier of the announcement
 *    responses:
 *      '200':
 *        description: Announcement found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Announcement'
 *      '400':
 *        description: Bad request if unacceptable id is passed
 *      '404':
 *        description: Not found if no announcement found with id
 *      '500':
 *        description: Internal server error
 *  patch:
 *    tags:
 *      - announcements
 *    summary: Partial update an announcement
 *    description: Partial update an announcement
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Unique identifier of the announcement
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              content:
 *                type: string
 *                description: Content of the announcement
 *    responses:
 *      '200':
 *        description: Announcement updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Announcement'
 *      '400':
 *        description: Bad request if unacceptable id is passed
 *      '404':
 *        description: Not found if no announcement found with id
 *      '500':
 *        description: Internal server error
 *  delete:
 *    summary: Delete an announcement
 *    description: Delete an announcement
 *    tags:
 *      - announcements
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Unique identifier of the announcement
 *    responses:
 *      '204':
 *        description: Announcement deleted
 *      '400':
 *        description: Bad request if unacceptable id is passed
 *      '404':
 *        description: Not found if no announcement found with id
 *      '500':
 *        description: Internal server error
*/
router.route('/:id')
  .get(
    paramValidationMiddleware,
    parseIntIdParam,
    detailAnnouncement
  )
  .patch(
    paramValidationMiddleware,
    generateValidationMiddleware(announcementsSchema.patchAnnouncementSchema),
    parseIntIdParam,
    editAnnouncement
  )
  .delete(
    paramValidationMiddleware,
    parseIntIdParam,
    deleteAnnouncement
  );

module.exports = router;