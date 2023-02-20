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
    .min(1)
    .max(11)

});

module.exports = { createCelebrationSchema, celebrationsParamSchema, patchcelebrationSchema };