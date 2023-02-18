/** function to parse the parameters of the request
 * @param {Object} requiredParams - object with the parameters to parse
 * @returns {Function} - function to be used as middleware
 */

const paramParser = (requiredParams) => {
  return (req, res, next) => {
    Object.keys(requiredParams).map((param) => {
      const requiredType = requiredParams[param];
      const value = req.params[param];
      if (!value) {
        return res.status(400).send(`${param} parameter is required.`);
      }
      let parsedValue;
      switch (requiredType) {
      case 'string':
        parsedValue = String(value);
        break;
      case 'number':
        parsedValue = Number(value);
        break;
      case 'boolean':
        parsedValue = Boolean(value);
        break;
      default:
        return res.status(500).send(`Unsupported data type ${requiredType} for ${param}.`);
      }
      if (parsedValue === undefined || Number.isNaN(parsedValue)) {
        return res.status(400).send(`Invalid ${param} parameter: ${value}.`);
      }
      req.params[param] = parsedValue;
    });
    next();
  };
};

module.exports = {
  paramParser
};