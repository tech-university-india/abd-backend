const joi = require('joi');

const poNotesParamSchema = joi.object({
  id: joi
    .number()
    .integer()
    .min(1)
  // .required()
});

const poNotesQuerySchema = joi.object({
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
    .valid('ACTION_ITEM', 'KEY_DECISION', 'AGENDA_ITEM'),
  date: joi
    .date()
    .iso(),
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
    .valid('COMPLETED', 'PENDING', 'NONE')
}).and('page', 'limit').and('startDate', 'endDate').oxor('date', 'startDate').oxor('date', 'endDate');

const createPONoteSchema = joi.object({
  dueDate: joi
    .date()
    .iso(),
  issueLink: joi
    .string()
    .uri(),
  note: joi
    .string()
    .min(1)
    .max(1500)
    .required(),
  type: joi
    .string()
    .valid('ACTION_ITEM', 'KEY_DECISION', 'AGENDA_ITEM')
    .required(),
  status: joi
    .string()
    .valid('COMPLETED', 'PENDING', 'NONE')
});

const patchPONoteSchema = joi.object({
  dueDate: joi
    .date()
    .iso(),
  note: joi
    .string()
    .min(1)
    .max(1500),
  type: joi
    .string()
    .valid('ACTION_ITEM', 'KEY_DECISION', 'AGENDA_ITEM'),
  status: joi
    .string()
    .valid('COMPLETED', 'PENDING', 'NONE'),
  issueLink: joi
    .string()
    .uri()
}).min(1);

const deletePONoteSchema = joi.object({
  deleteType: joi
    .string()
    .valid('HARD'),
});

module.exports = {
  poNotesParamSchema,
  createPONoteSchema,
  poNotesQuerySchema,
  patchPONoteSchema,
  deletePONoteSchema
};