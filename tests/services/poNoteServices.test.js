const prisma = require('../../src/prismaClient');
const poNotesServices = require('../../src/services/poNoteServices');

const prismaUtils = require('../../src/utils/prismaUtils');
const { HttpError } = require('../../src/errors');

describe('getPONotesByQuickFilter', () => {

  let poNotes = [
    {
      'noteId': 8,
      'type': 'AGENDA_ITEM',
      'note': 'string',
      'status': 'PENDING',
      'dueDate': null,
      'issueLink': null
    },
    {
      'noteId': 7,
      'type': 'KEY_DECISION',
      'note': 'string',
      'status': 'NONE',
      'dueDate': null,
      'issueLink': null
    }
  ];

  const paginationObj = {
    skip: 0,
    take: 1
  };

  const spiedDateRangeFunction = jest.spyOn(prismaUtils, 'getDateRangeObject')
    .mockResolvedValue({});
  const spiedSearchKeywordFunction = jest.spyOn(prismaUtils, 'getSearchKeywordObject')
    .mockResolvedValue({});
  const spiedStatusQueryFunction = jest.spyOn(prismaUtils, 'getStatusQueryObject')
    .mockResolvedValue({});
  const spiedPagination = jest.spyOn(prismaUtils, 'getPaginationObject')
    .mockResolvedValue(paginationObj);
  const spiedFindMany = jest.spyOn(prisma.PONote, 'findMany')
    .mockResolvedValue(poNotes);

  it('should return list of all po notes (no filters)', async () => {
    const params = [];

    const returnedVal = await poNotesServices.getPONotesByQuickFilter(...params);
    expect(spiedFindMany).toBeCalled();
    expect(spiedDateRangeFunction).not.toHaveBeenCalled();
    expect(spiedSearchKeywordFunction).not.toHaveBeenCalled();
    expect(spiedStatusQueryFunction).not.toHaveBeenCalled();
    expect(spiedPagination).toBeCalledWith(undefined, undefined);
    expect(returnedVal)
      .toEqual(poNotes);
  });
  it('should return list of filtered po notes (filter on specific date)', async () => {
    const params = [
      'AGENDA_ITEM',
      '27-01-2023',
      undefined,
    ];

    const returnedVal = await poNotesServices.getPONotesByQuickFilter(...params);

    expect(spiedFindMany).toBeCalled();
    expect(spiedDateRangeFunction).toBeCalledWith(
      '27-01-2023', undefined
    );
    expect(spiedStatusQueryFunction).not.toHaveBeenCalled();
    expect(spiedSearchKeywordFunction).not.toHaveBeenCalled();
    expect(spiedPagination).toBeCalledWith(undefined, undefined);
    expect(returnedVal)
      .toEqual(poNotes);
  });
  it('should return list of filtered po notes (on custom range date)', async () => {
    const params = [
      'AGENDA_ITEM',
      '27-01-2023',
      '28-01-2023'
    ];

    const returnedVal = await poNotesServices.getPONotesByQuickFilter(...params);

    expect(spiedFindMany).toBeCalled();
    expect(spiedDateRangeFunction).toBeCalledWith(
      '27-01-2023', '28-01-2023'
    );
    expect(spiedStatusQueryFunction).not.toHaveBeenCalled();
    expect(spiedSearchKeywordFunction).not.toHaveBeenCalled();
    expect(spiedPagination).toBeCalledWith(undefined, undefined);
    expect(returnedVal)
      .toEqual(poNotes);
  });
  it('should return list of filtered po notes (with search)', async () => {
    const params = [
      'AGENDA_ITEM',
      '27-01-2023',
      '28-01-2023',
      'string'
    ];

    const returnedVal = await poNotesServices.getPONotesByQuickFilter(...params);
    expect(spiedFindMany).toBeCalled();
    expect(spiedDateRangeFunction).toBeCalledWith(
      '27-01-2023', '28-01-2023'
    );
    expect(spiedStatusQueryFunction).not.toHaveBeenCalled();
    expect(spiedSearchKeywordFunction).toBeCalledWith('string');
    expect(spiedPagination).toBeCalledWith(undefined, undefined);
    expect(returnedVal)
      .toEqual(poNotes);
  });
  it('should return list of filtered po notes (with status)', async () => {
    const params = [
      'AGENDA_ITEM',
      '27-01-2023',
      '28-01-2023',
      'string',
      'COMPLETED'
    ];

    const returnedVal = await poNotesServices.getPONotesByQuickFilter(...params);
    expect(spiedFindMany).toBeCalled();
    expect(spiedDateRangeFunction).toBeCalledWith(
      '27-01-2023', '28-01-2023'
    );
    expect(spiedStatusQueryFunction).toBeCalledWith('COMPLETED');
    expect(spiedSearchKeywordFunction).toBeCalledWith('string');
    expect(spiedPagination).toBeCalledWith(undefined, undefined);
    expect(returnedVal)
      .toEqual(poNotes);
  });
  it('should return list of filtered po notes (with pagination)', async () => {
    const params = [
      'AGENDA_ITEM',
      '27-01-2023',
      '28-01-2023',
      'string',
      'COMPLETED',
      1,
      10
    ];

    const returnedVal = await poNotesServices.getPONotesByQuickFilter(...params);
    expect(spiedFindMany).toBeCalled();
    expect(spiedDateRangeFunction).toBeCalledWith(
      '27-01-2023', '28-01-2023'
    );
    expect(spiedStatusQueryFunction).toBeCalledWith('COMPLETED');
    expect(spiedSearchKeywordFunction).toBeCalledWith('string');
    expect(spiedPagination).toBeCalledWith(1, 10);
    expect(returnedVal)
      .toEqual(poNotes);
  });
  it('should return empty list if no records found', async () => {
    const params = [];

    const spiedFindMany = jest.spyOn(prisma.PONote, 'findMany')
      .mockResolvedValue([]);

    const returnedVal = await poNotesServices.getPONotesByQuickFilter(...params);
    expect(spiedFindMany).toBeCalled();
    expect(returnedVal)
      .toEqual([]);
  });
});

describe('getPONoteByID', () => {

  const noteId = 8;

  const poNote =
  {
    'noteId': 8,
    'type': 'AGENDA_ITEM',
    'note': 'string',
    'status': 'PENDING',
    'dueDate': null,
    'issueLink': null
  };

  it('should return one po note as an object', async () => {
    const spiedFindFirst = jest.spyOn(prisma.PONote, 'findFirst')
      .mockResolvedValue(poNote);

    const returnedVal = await poNotesServices.getPONoteByID(noteId);
    expect(spiedFindFirst).toBeCalled();
    expect(returnedVal).toEqual(poNote);
  });
  it('should return empty object if nothing found', async () => {
    const spiedFindFirst = jest.spyOn(prisma.PONote, 'findFirst')
      .mockResolvedValue(null);

    await expect(async () => {
      await poNotesServices.getPONoteByID(noteId);
    }).rejects.toThrowError(new HttpError(404, '(SEARCH) : No Record Found'));
    expect(spiedFindFirst).toBeCalled();
  });
});

describe('createValidPONote', () => {
  it('should return new created po note as an object (without dueDate & issueLink)', async () => {
    const createPONote = {
      'type': 'AGENDA_ITEM',
      'note': 'string'
    };

    const poNote =
    {
      'noteId': 8,
      'type': 'AGENDA_ITEM',
      'note': 'string',
      'status': 'PENDING',
      'dueDate': null,
      'issueLink': null
    };

    const spiedCreate = jest.spyOn(prisma.PONote, 'create')
      .mockResolvedValue(poNote);

    const returnedVal = await poNotesServices.createValidPONote(createPONote);
    expect(spiedCreate).toBeCalled();
    expect(returnedVal).toEqual(poNote);
  });
  it('should return new created po note as an object (with just dueDate)', async () => {
    const createPONote = {
      'type': 'AGENDA_ITEM',
      'note': 'string',
      'dueDate': '27-01-2023',
    };

    const poNote =
    {
      'noteId': 8,
      'type': 'AGENDA_ITEM',
      'note': 'string',
      'status': 'PENDING',
      'dueDate': '27-01-2023',
      'issueLink': null
    };

    const spiedCreate = jest.spyOn(prisma.PONote, 'create')
      .mockResolvedValue(poNote);

    const returnedVal = await poNotesServices.createValidPONote(createPONote);
    expect(spiedCreate).toBeCalled();
    expect(returnedVal).toEqual(poNote);
  });
  it('should return new created po note as an object (with both dueDate & issueLink)', async () => {
    const createPONote = {
      'type': 'AGENDA_ITEM',
      'note': 'string',
      'dueDate': '27-01-2023',
      'issueLink': 'http://it-me'
    };

    const poNote =
    {
      'noteId': 8,
      'type': 'AGENDA_ITEM',
      'note': 'string',
      'status': 'PENDING',
      'dueDate': '27-01-2023',
      'issueLink': 'http://it-me'
    };

    const spiedCreate = jest.spyOn(prisma.PONote, 'create')
      .mockResolvedValue(poNote);

    const returnedVal = await poNotesServices.createValidPONote(createPONote);
    expect(spiedCreate).toBeCalled();
    expect(returnedVal).toEqual(poNote);
  });
  it('should return new created po note as an object (with ACTION_ITEM as type)', async () => {
    const createPONote = {
      'type': 'ACTION_ITEM',
      'note': 'string',
      'status': 'PENDING',
      'dueDate': undefined,
      'issueLink': undefined
    };

    const poNote =
    {
      'noteId': 8,
      'type': 'ACTION_ITEM',
      'note': 'string',
      'status': 'PENDING',
      'dueDate': undefined,
      'issueLink': undefined
    };

    const params = Object.values(createPONote);

    const spiedCreate = jest.spyOn(prisma.PONote, 'create')
      .mockResolvedValue(poNote);

    const returnedVal = await poNotesServices.createValidPONote(...params);
    expect(spiedCreate).toBeCalled();
    expect(returnedVal).toEqual(poNote);
  });
  it('should return new created po note as an object (with status COMPLETED)', async () => {
    const createPONote = {
      'type': 'ACTION_ITEM',
      'note': 'string',
      'status': 'COMPLETED',
      'dueDate': '27-01-2023',
      'issueLink': 'http://it-me'
    };

    const poNote =
    {
      'noteId': 8,
      'type': 'ACTION_ITEM',
      'note': 'string',
      'status': 'COMPLETED',
      'dueDate': '27-01-2023',
      'issueLink': 'http://it-me'
    };

    const spiedCreate = jest.spyOn(prisma.PONote, 'create')
      .mockResolvedValue(poNote);

    const returnedVal = await poNotesServices.createValidPONote(createPONote);
    expect(spiedCreate).toBeCalled();
    expect(returnedVal).toEqual(poNote);
  });
});

describe('updatePONoteById', () => {
  it('should return updated po note as an object (without dueDate & issueLink)', async () => {
    const updatePONote = {
      'noteId': 8,
      'note': 'string'
    };

    const params = [8, 'string'];

    const updateResult = { count: 1 };
    const spiedUpdate = jest.spyOn(prisma.PONote, 'updateMany')
      .mockResolvedValue(updateResult);

    const returnedVal = await poNotesServices.updatePONoteById(...params);
    expect(spiedUpdate).toBeCalled();
    expect(returnedVal).toEqual(updatePONote);
  });
  it('should return updated po note as an object (all, but without dueDate)', async () => {
    const updatePONote = {
      'noteId': 8,
      'note': 'string',
      'status': 'PENDING',
      'dueDate': undefined,
      'issueLink': 'http://it-me',
      'type': 'ACTION_ITEM',
    };

    const params = Object.values(updatePONote);

    const updateResult = { count: 1 };
    const spiedUpdate = jest.spyOn(prisma.PONote, 'updateMany')
      .mockResolvedValue(updateResult);

    const returnedVal = await poNotesServices.updatePONoteById(...params);
    expect(spiedUpdate).toBeCalled();
    expect(returnedVal).toEqual(updatePONote);
  });
  it('should return updated po note as an object (all, including dueDate)', async () => {
    const dueDate = '2023-01-27';
    const dueDateInDateFormate = new Date(dueDate).toISOString();
    const updatePONote = {
      'noteId': 8,
      'note': 'string',
      'status': 'PENDING',
      'dueDate': dueDate,
      'issueLink': 'http://it-me',
      'type': 'ACTION_ITEM',
    };

    const params = Object.values(updatePONote);

    const updateResult = { count: 1 };
    const spiedUpdate = jest.spyOn(prisma.PONote, 'updateMany')
      .mockResolvedValue(updateResult);

    const returnedVal = await poNotesServices.updatePONoteById(...params);
    expect(spiedUpdate).toBeCalled();
    expect(returnedVal).toEqual({
      ...updatePONote,
      dueDate: dueDateInDateFormate
    });
  });
  it('should throw error when not existing noteId is passed', async () => {
    const params = [8, 'string'];

    // count = 0 mean no data exists
    const updateResult = { count: 0 };

    const spiedUpdate = jest.spyOn(prisma.PONote, 'updateMany')
      .mockResolvedValue(updateResult);
    expect(spiedUpdate).toBeCalled();

    await expect(async () => {
      await poNotesServices.updatePONoteById(...params);
    }).rejects.toThrowError(new HttpError(404, '(UPDATE) : No Record Found'));
  });
});

describe('softDeletePONoteById', () => {
  it('should return object with count property & value to be 1', async () => {
    const noteId = 8;

    const updateResult = { count: 1 };
    const spiedDelete = jest.spyOn(prisma.PONote, 'updateMany')
      .mockResolvedValue(updateResult);

    const returnedVal = await poNotesServices.softDeletePONoteById(noteId);
    expect(spiedDelete).toBeCalled();
    expect(returnedVal).toEqual(updateResult);
  });
  it('should throw error when not existing noteId is passed', async () => {
    const noteId = 8;

    const updateResult = { count: 0 };
    const spiedDelete = jest.spyOn(prisma.PONote, 'updateMany')
      .mockResolvedValue(updateResult);

    await expect(async () => {
      await poNotesServices.softDeletePONoteById(noteId);
    }).rejects.toThrowError(new HttpError(404, '(DELETE) : No Record Found'));
    expect(spiedDelete).toBeCalled();
  });
});

describe('hardDeletePONoteById', () => {
  it('should return object with count property & value to be 1', async () => {
    const noteId = 8;

    const deleteResult = { count: 1 };
    const spiedDelete = jest.spyOn(prisma.PONote, 'deleteMany')
      .mockResolvedValue(deleteResult);

    const returnedVal = await poNotesServices.hardDeletePONoteById(noteId);
    expect(spiedDelete).toBeCalled();
    expect(returnedVal).toEqual(deleteResult);
  });
  it('should throw error when not existing noteId is passed', async () => {
    const noteId = 8;

    const deleteResult = { count: 0 };
    const spiedDelete = jest.spyOn(prisma.PONote, 'deleteMany')
      .mockResolvedValue(deleteResult);

    await expect(async () => {
      await poNotesServices.hardDeletePONoteById(noteId);
    }).rejects.toThrowError(new HttpError(404, '(DELETE) : No Record Found'));
    expect(spiedDelete).toBeCalled();
  });
});