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
  startDate: joi
    .date()
    .iso(),
  endDate: joi
    .date()
    .iso(),
  search: joi
    .string(),
  status: joi
    .when(joi.ref('type'), {
      is: 'KEY_DECISION',
      then: joi
        .string()
        .valid('DRAFT', 'NONE'),
      otherwise: joi
        .string()
        .valid('DRAFT', 'COMPLETED', 'PENDING', 'NONE'),
    })

}).and('page', 'limit').with('endDate', 'startDate');


const createPONoteSchema = joi.object({
  dueDate: joi
    .when(joi.ref('type'), {
      is: 'ACTION_ITEM',
      then: joi
        .date()
        .iso(),
      otherwise: joi
        .forbidden(),
    }),
  issueLink: joi
    .when(joi.ref('type'), {
      is: 'ACTION_ITEM',
      then: joi
        .string()
        .uri(),
      otherwise: joi
        .forbidden(),
    }),
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
    .when(joi.ref('type'), {
      is: 'KEY_DECISION',
      then: joi
        .string()
        .valid('DRAFT', 'NONE').required(),
      otherwise: joi
        .string()
        .valid('DRAFT', 'COMPLETED', 'PENDING'),
    })

});

const patchPONoteSchema = joi.object({
  dueDate: joi
    .when(joi.ref('type'), {
      is: 'ACTION_ITEM',
      then: joi
        .date()
        .iso(),
      otherwise: joi
        .forbidden(),
    }),
  note: joi
    .string()
    .min(1)
    .max(1500),
  type: joi
    .string()
    .valid('ACTION_ITEM', 'KEY_DECISION', 'AGENDA_ITEM'),
  status: joi
    .when(joi.ref('type'), {
      is: 'KEY_DECISION',
      then: joi
        .string()
        .valid('DRAFT', 'NONE'),
      otherwise: joi
        .string()
        .valid('DRAFT', 'COMPLETED', 'PENDING'),
    }),
  issueLink: joi
    .when(joi.ref('type'), {
      is: 'ACTION_ITEM',
      then: joi
        .string()
        .uri(),
      otherwise: joi
        .forbidden(),
    }),
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
