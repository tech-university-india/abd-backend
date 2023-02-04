const getPaginationObject = (page, limit) => {

  return page && limit ? {
    skip: (page - 1) * limit,
    take: limit * 1
  } : null;
};

module.exports = {
  getPaginationObject,
};
