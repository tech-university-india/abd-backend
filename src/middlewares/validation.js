// function to validate request on defined joi schema
function generateValidationMiddleware(joiSchema, reqAttributeToValidate = 'body') {
  return (req, res, next) => {
    const { error } = joiSchema.validate(req[reqAttributeToValidate]);
    error ? next(error) : next();
  };
}
module.exports = {
  generateValidationMiddleware
};