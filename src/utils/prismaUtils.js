const getPaginationObject = (page, limit) => {

  return page && limit ? {
    skip: (page - 1) * limit,
    take: limit * 1
  } : null;
};

// get formated date range object to filter notes,
// that will be used in the query
const getDateRangeObject = (startDate, endDate) => {

  const sDate = new Date(startDate);
  const eDate = endDate ?
    new Date(endDate) :
    new Date(startDate);

  eDate.setDate(eDate.getDate() + 1);

  return {
    createdAt: {
      gte: sDate,
      lt: eDate
    }
  };
};

// get formated search object to filter notes,
// that will be used in the query
const getSearchKeywordObject = (searchKeyword) => {
  return {
    note: {
      contains: searchKeyword,
      mode: 'insensitive',
    }
  };
};

// get formated status object to filter notes,
// that will be used in the query
const getStatusQueryObject = (status) => {
  status = status.toUpperCase();
  return {
    status
  };
};

module.exports = {
  getPaginationObject,
  getStatusQueryObject,
  getSearchKeywordObject,
  getDateRangeObject
};
