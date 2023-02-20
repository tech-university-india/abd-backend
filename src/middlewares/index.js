const { HttpError } = require('../errors');
const joi = require('joi');
const { Prisma } = require('@prisma/client');

// ERROR HANDLING MIDDLEWARE
// here handle all the errors,
// either coming from the routes/controllers/services
// like joi validation, prisma query errors or custom http errors
function errorHandlingMiddleware(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  switch (err.constructor) {
  case joi.ValidationError: {
    return res.status(400).json({ message: 'Bad Request - ' + err.message });
  }
  // this is the error thrown by prisma client
  // when the input data is not valid
  case Prisma.PrismaClientValidationError: {
    return res.status(400).json({ message: 'Bad Request - Invalid Inputs' + err.message });
  }
  case HttpError: {
    return res.status(err.code).json({ message: err.message });
  }
  case Prisma.PrismaClientKnownRequestError: {
    // seperatly handling the internal db or query errors
    // thrown prisma  ("2***" error codes)
    if(err.code === 'P2025') {
      return res.status(404).json({ message: 'Record to delete does not exist' });
    } else
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
