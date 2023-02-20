const router = require("express").Router();
const {
  createSentiment,
  detailSentiment,
  updateSentiment,
  countSentimentByDate,
  getAllSentiment,
} = require("../../../controllers/dsm/sentimentMeter.controller");
const {
  generateValidationMiddleware,
} = require("../../../middlewares/validation");
const sentimentMeterSchema = require("../../../schemas/dsm/sentimentMeterSchema");
router.post(
  "/",
  generateValidationMiddleware(sentimentMeterSchema.createSentiment),
  createSentiment
);
router.get("/", getAllSentiment);

router.get(
  "/date/:createdAt",
  generateValidationMiddleware(sentimentMeterSchema.dateSchema, "params"),
  countSentimentByDate
);
router.get(
  "/:id",
  generateValidationMiddleware(sentimentMeterSchema.getByIdSchema, "params"),
  detailSentiment
);
router.patch(
  "/:id",
  generateValidationMiddleware(sentimentMeterSchema.patchSentiment, "params"),
  updateSentiment
);
module.exports = router;
