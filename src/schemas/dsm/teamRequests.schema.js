const joi = require('joi');
const createValidTeamRequest = joi.object({
  author: joi
    .string()
    .min(1)
    .max(1500)
    .required(),
  content: joi
    .string()
    .min(1)
    .max(1500)
    .required(),
  type: joi
    .string()
    .valid('MEETING', 'RESOURCE'),
  taggedIndividuals: joi
    .array().items(joi.number().integer())
});
const editTeamRequest = joi.object(
  {
    author: joi
      .string()
      .min(1)
      .max(1500),
    content: joi
      .string()
      .min(1)
      .max(1500)
      .required(),
    taggedIndividuals: joi
      .array().items(joi.number().integer()),
    type: joi
      .string()
      .valid('MEETING', 'RESOURCE'),
    status: joi
      .string()
      .valid('PENDING', 'APPROVED', 'REJECTED')

  }
);
const deleteTeamRequest = joi.object({
  id: joi
    .number()
    .integer()
    .min(1)
});
const dsmRequestQuerySchema = joi.object({
  page: joi
    .number()
    .integer()
    .min(1),
  limit: joi
    .number()
    .integer()
    .min(1),
  type: joi
    .string()
    .valid('MEETING', 'RESOURCE'),
  startDate: joi
    .date()
    .iso(),
  endDate: joi
    .date()
    .iso(),
  search: joi
    .string(),
  status: joi
    .string()
    .valid('PENDING', 'APPROVED', 'REJECTED'),
  author: joi
    .string()
    .min(1)
    .max(1500)
}).and('page', 'limit').with('endDate', 'startDate');
const teamRequestsParamSchema = joi.object({
  id: joi.number()
    .integer()
    .min(1)
});
module.exports = { createValidTeamRequest, editTeamRequest, deleteTeamRequest, dsmRequestQuerySchema,teamRequestsParamSchema };