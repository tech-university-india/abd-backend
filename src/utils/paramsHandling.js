const parseIntIdParam = (req, res, next) => {
  req.params.id = parseInt(req.params.id, 10);
  next();
};
module.exports = { parseIntIdParam };