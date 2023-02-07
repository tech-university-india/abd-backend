const { PrismaClient } = require('@prisma/client');
const { HttpError } = require('../errors');
const prisma = new PrismaClient();

const selectOnlyValidPONoteFields = {
  select: {
    noteId: true,
    type: true,
    note: true,
    status: true,
    dueDate: true,
    issueLink: true,
  }
};

// get formated date range object to filter notes,
// that will be used in the query
const getDateRangeObject = (startDate, endDate = null) => {

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
    OR: [
      {
        status
      },
      {
        status: 'NONE'
      }
    ]
  };
};

// get all notes by quick filter
const getPONotesByQuickFilter = async (
  type,
  date = null,
  startDate = null,
  endDate = null,
  searchKeyword = null,
  status = null,
  paginationObj
) => {
  let filterObj = {};

  filterObj = date ? { ...filterObj, ...getDateRangeObject(date) } : filterObj;
  filterObj = startDate ? { ...filterObj, ...getDateRangeObject(startDate, endDate) } : filterObj;
  filterObj = searchKeyword ? { ...filterObj, ...getSearchKeywordObject(searchKeyword) } : filterObj;
  filterObj = status ? { ...filterObj, ...getStatusQueryObject(status) } : filterObj;
  filterObj = type ? { ...filterObj, type } : filterObj;

  const notes = await prisma.PONote.findMany({
    where: {
      ...filterObj,
      isDeleted: false
    },
    orderBy: {
      createdAt: 'desc',
    },
    ...(paginationObj && paginationObj),
    ...selectOnlyValidPONoteFields
  }
  );

  if (!notes) throw new HttpError(404, '(SEARCH) : No Records Found');
  return notes;
};

// get specific note by id
const getPONoteByID = async (noteId) => {
  const noteObj = await prisma.PONote.findFirst({
    where: {
      noteId,
      isDeleted: false
    },
    ...selectOnlyValidPONoteFields
  });
  if (!noteObj) throw new HttpError(404, '(SEARCH) : No Record Found');
  return noteObj;
};

// create a new note
const createValidPONote = async (
  type, note,
  status, dueDate,
  issueLink
) => {

  const noteDetails = {
    type,
    note,
    ...(status && { status })
  };

  const createdNote = await prisma.PONote.create({
    data: {
      ...noteDetails,
      ...(type === 'KEY_DECISION' && {
        status: 'NONE'
      }),
      ...(type === 'ACTION_ITEM' && dueDate && {
        dueDate: new Date(dueDate).toISOString()
      }),
      ...(type === 'ACTION_ITEM' && issueLink && {
        issueLink
      })
    },
    ...selectOnlyValidPONoteFields
  },
  );

  return createdNote;
};

// update a note
const updatePONoteById = async (
  noteId, note,
  status, dueDate,
  issueLink, type
) => {

  const updateDetails = {
    ...(note && { note }),
    ...(status && { status }),
    ...(dueDate && { dueDate: new Date(dueDate).toISOString() }),
    ...(issueLink && { issueLink }),
    ...(type && { type })
  };

  const noteObj =
    await prisma.PONote.updateMany({
      where: {
        noteId,
        isDeleted: false
      },
      data: updateDetails,
    });

  if (noteObj.count === 0) throw new HttpError(404, '(UPDATE) : No Record Found');

  return {
    noteId,
    ...updateDetails
  };
};

// soft delete a note
const softDeletePONoteById = async (noteId) => {
  const noteObj = await prisma.PONote.updateMany({
    where: {
      noteId,
      isDeleted: false
    },
    data: {
      isDeleted: true
    },
  });

  if (noteObj.count === 0) throw new HttpError(404, '(DELETE) : No Record Found');
  return noteObj;
};

// hard delete a note
const hardDeletePONoteById = async (noteId) => {
  const noteObj = await prisma.PONote.delete({
    where: {
      noteId,
      isDeleted: false
    },
  });

  if (noteObj.count === 0) throw new HttpError(404, '(DELETE) : No Record Found');
  return noteObj;
};

module.exports = {
  getPONoteByID,
  getPONotesByQuickFilter,
  createValidPONote,
  updatePONoteById,
  hardDeletePONoteById,
  softDeletePONoteById
};