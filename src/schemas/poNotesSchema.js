const joi = require('joi');

const poNotesParamSchema = joi.object({
  id: joi
    .number()
    .integer()
    .min(0)
});

const poNotesQuerySchema = joi.object({
  page: joi
    .number()
    .integer()
    .min(0),
  limit: joi
    .number()
    .integer()
    .min(0),
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
});

const createPONoteSchema = joi.object({
  dueDate: joi
    .date()
    .iso(),
  note: joi
    .string()
    .required(),
  type: joi
    .string()
    .valid('ACTION_ITEM', 'KEY_DECISION', 'AGENDA_ITEM')
    .required(),
});

const patchPONoteSchema = joi.object({
  dueDate: joi
    .date()
    .iso(),
  note: joi
    .string(),
  type: joi 
    .string()
    .valid('ACTION_ITEM', 'KEY_DECISION', 'AGENDA_ITEM'),
  status: joi
    .string()
    .valid('COMPLETED', 'PENDING', 'NONE'),
  issueLink: joi
    .string()
    .uri()
});

module.exports = {
  poNotesParamSchema,
  createPONoteSchema,
  poNotesQuerySchema,
  patchPONoteSchema
};