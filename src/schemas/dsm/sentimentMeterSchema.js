const joi = require("joi");
const createSentiment = joi.object({
  author: joi.number().integer().min(1),
  sentiment: joi.valid("OK", "GOOD", "BAD", "HAPPY"),
});

const dateSchema = joi.object({
  createdAt: joi.date(),
});

const getByIdSchema = joi.object({
  id: joi.number().integer().min(1),
});

const patchSentiment = joi.object({
  id: joi.number().integer().min(1),
  sentiment: joi.valid("OK", "GOOD", "BAD", "HAPPY"),
});

module.exports = { createSentiment, dateSchema, getByIdSchema, patchSentiment };
