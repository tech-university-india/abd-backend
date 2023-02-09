const prismaUtils = require('../../src/utils/prismaUtils');

describe('getPaginationObject', () => {
  it('should return valid object when valid args is passed', () => {
    const page = 1, limit = 10;
    const result = {
      skip: 0,
      take: 10
    };
    const returnedVal = prismaUtils.getPaginationObject(page, limit);
    expect(returnedVal).toEqual(result);
  });
  it('should return null when page & limit arg is passed as undefined', () => {
    const page = undefined, limit = undefined;
    const returnedVal = prismaUtils.getPaginationObject(page, limit);
    expect(returnedVal).toEqual(null);
  });
});

describe('getSearchKeywordObject', () => {
  it('should return valid object when valid args is passed', () => {
    const searchKeyword = 'search';
    const result = {
      note: {
        contains: 'search',
        mode: 'insensitive',
      }
    };
    const returnedVal = prismaUtils.getSearchKeywordObject(searchKeyword);
    expect(returnedVal).toEqual(result);
  });
});

describe('getStatusQueryObject', () => {
  it('should return valid object when valid args is passed', () => {
    const status = 'PENDING';
    const result = {
      status: 'PENDING'
    };
    const returnedVal = prismaUtils.getStatusQueryObject(status);
    expect(returnedVal).toEqual(result);
  });
});

describe('getDateRangeObject', () => {
  it('should return valid object when both start & end date is passed', () => {
    const startDate = '2023-01-27', endDate = '2023-01-28';
    const result = {
      createdAt: {
        gte: new Date('2023-01-27'),
        lt: new Date('2023-01-29')
      }
    };
    const returnedVal = prismaUtils.getDateRangeObject(startDate, endDate);
    expect(returnedVal).toEqual(result);
  });
  it('should return valid object when only start is passed', () => {
    const startDate = '2023-01-27', endDate = undefined;
    const result = {
      createdAt: {
        gte: new Date('2023-01-27'),
        lt: new Date('2023-01-28')
      }
    };
    const returnedVal = prismaUtils.getDateRangeObject(startDate, endDate);
    expect(returnedVal).toEqual(result);
  });
  it('should return null when page & limit arg is passed as undefined', () => {
    const page = undefined, limit = undefined;
    const returnedVal = prismaUtils.getPaginationObject(page, limit);
    expect(returnedVal).toEqual(null);
  });
});