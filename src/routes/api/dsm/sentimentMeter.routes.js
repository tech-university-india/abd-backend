const router = require('express').Router();
const {
  createSentiment,
  detailSentiment,
  updateSentiment,
  countSentimentByDate,
  getAllSentiment,
  deleteSentimentById
} = require('../../../controllers/dsm/sentimentMeter.controller');
const {
  generateValidationMiddleware,
} = require('../../../middlewares/validation');
const sentimentMeterSchema = require('../../../schemas/dsm/sentimentMeterSchema');

/**
 * @openapi
 * components:
 *   schemas:
 *     SentimentMeter:
 *       type: object
 *       required:
 *         - sentimentMeterId
 *         - author
 *         - sentiment
 *         - createdAt
 *       properties:
 *         sentimentId:
 *           type: integer
 *           description: Unique identifier of the sentimentMeter
 *         author:
 *           type: string
 *           description: Unique identifier of the author
 *         sentiment:
 *           type: string
 *           description: Sentiment of the author
 *           enum:
 *             - HAPPY
 *             - SAD
 *             - OK
 *             - BAD
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Created at
 */

/**
 * @openapi
 * /api/dsm/sentiment-meter:
 *   get:
 *     summary: Get all sentimentMeter
 *     tags:
 *       - sentimentMeter
 *     description: Get all sentiments
 *     responses:
 *       200:
 *         description: List of all sentiments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SentimentMeter'
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a sentimentMeter
 *     tags:
 *       - sentimentMeter
 *     description: Create a sentimentMeter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - author
 *               - sentiment
 *             properties:
 *               author:
 *                 type: string
 *                 description: Unique identifier of the author
 *               sentiment:
 *                 type: string
 *                 description: Sentiment of the authors
 *                 enum:
 *                   - HAPPY
 *                   - SAD
 *                   - OK
 *                   - BAD
 *     responses:
 *       201:
 *         description: SentimentMeter created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SentimentMeter'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.get('/', getAllSentiment);
router.post(
  '/',
  generateValidationMiddleware(sentimentMeterSchema.createSentiment),
  createSentiment
);

/**
 * @openapi
 * /api/dsm/sentiment-meter/date/{createdAt}:
 *   get:
 *     summary: Get sentimentMeter by date
 *     tags:
 *       - sentimentMeter
 *     description: Get sentimentMeter by date
 *     parameters:
 *       - in: path
 *         name: createdAt
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Date of the sentimentMeter
 *     responses:
 *       200:
 *         description: SentimentMeter by date
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SentimentMeter'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.get(
  '/date/:createdAt',
  generateValidationMiddleware(sentimentMeterSchema.dateSchema, 'params'),
  countSentimentByDate
);

/**
 * @openapi
 * /api/dsm/sentiment-meter/{id}:
 *   get:
 *     summary: Get sentimentMeter by id
 *     tags:
 *       - sentimentMeter
 *     description: Get sentimentMeter by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique identifier of the sentimentMeter
 *     responses:
 *       200:
 *         description: SentimentMeter by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SentimentMeter'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update sentimentMeter by id
 *     tags:
 *       - sentimentMeter
 *     description: Update sentimentMeter by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique identifier of the sentimentMeter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sentiment
 *             properties:
 *               sentiment:
 *                 type: string
 *                 description: Sentiment of the authors
 *                 enum:
 *                   - HAPPY
 *                   - SAD
 *                   - OK
 *                   - BAD
 *     responses:
 *       200:
 *         description: SentimentMeter updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SentimentMeter'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete sentimentMeter by id
 *     tags:
 *       - sentimentMeter
 *     description: Delete sentimentMeter by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique identifier of the sentimentMeter
 *     responses:
 *       200:
 *         description: Sentiment deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SentimentMeter'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.get(
  '/:id',
  generateValidationMiddleware(sentimentMeterSchema.getByIdSchema, 'params'),
  detailSentiment
);
router.patch(
  '/:id',
  generateValidationMiddleware(sentimentMeterSchema.patchSentiment, 'params'),
  updateSentiment
);
router.delete(
  '/:id',
  generateValidationMiddleware(sentimentMeterSchema.getByIdSchema, 'params'),
  deleteSentimentById
);

module.exports = router;
