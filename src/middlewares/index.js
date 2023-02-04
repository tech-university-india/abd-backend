const {HttpError} = require('../errors');
const joi = require('joi');

function errorHandlingMiddleware(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  switch (err.constructor) {
  case joi.ValidationError: {
    return res.status(400).json({ error: err.message });
  }
  case HttpError: {
    return res.status(err.code).json({ error: err.message });
  }
  default: {
    res.status(500).json({ error: err.message });
  }
  }
}

module.exports = {
  errorHandlingMiddleware,
};
