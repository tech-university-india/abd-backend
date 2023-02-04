const { HttpError } = require('../errors');
const joi = require('joi');
const { Prisma } = require('@prisma/client');

function errorHandlingMiddleware(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  switch (err.constructor) {
  case joi.ValidationError: {
    return res.status(400).json({ message: 'Bad Request - ' + err.message });
  }
  case Prisma.PrismaClientValidationError: {
    return res.status(400).json({ message: 'Bad Request - Invalid Inputs' + err.message });
  }
  case HttpError: {
    return res.status(err.code).json({ message: err.message });
  }
  case Prisma.PrismaClientKnownRequestError: {
    if ((/2\d{3}/g).exec(err.code)) {
      return res.status(500).json({ message: 'Internal Server Error - Query Engine Went Wrong' });
    }
    return res.status(500).json({ message: 'Internal Server Error - Something Went Wrong' });
  }
  default: {
    res.status(500).json({ message: 'Internal Server Error - Something Went Wrong' });
  }
  }
}

module.exports = {
  errorHandlingMiddleware,
};
