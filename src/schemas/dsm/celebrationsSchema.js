const joi = require('joi');

const createCelebrationSchema = joi.object({
  content: joi
    .string()
    .min(1)
    .max(1500)
    .required(),

  type: joi
    .string()
    .valid('CELEBRATION', 'IMPEDIMENT')
    .required(),

  isAnonymous: joi
    .valid(true, false)
    .required(),
});

const celebrationsParamSchema = joi.object({
  id: joi
    .number()
    .integer()
    .min(1)
});

const patchcelebrationSchema = joi.object({
  content: joi
    .string()
    .min(1)
    .max(1500),

  type: joi
    .string()
    .valid('CELEBRATION', 'IMPEDIMENT'),
});

const patchReactionSchema = joi.object({
  isReacted: joi
    .valid(true, false)
    .required(),
});

module.exports = {
  createCelebrationSchema,
  celebrationsParamSchema,
  patchcelebrationSchema,
  patchReactionSchema
};