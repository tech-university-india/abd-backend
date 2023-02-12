const { HttpError } = require('../errors');
const prisma = require('../prismaClient');
const prismaUtils = require('../utils/prismaUtils');

const selectOnlyValidPONoteFields = {
  select: {
    noteId: true,
    type: true,
    note: true,
    status: true,
    dueDate: true,
    issueLink: true,
    createdAt: true,
  }
};

// get all notes by quick filter
const getPONotesByQuickFilter = async (
  type,
  startDate,
  endDate,
  searchKeyword,
  status,
  page,
  limit
) => {
  let filterObj = {};

  const paginationObj = prismaUtils.getPaginationObject(page, limit);

  filterObj = startDate ? {
    ...filterObj, ...prismaUtils.getDateRangeObject(startDate, endDate)
  } : filterObj;
  filterObj = searchKeyword ? {
    ...filterObj, ...prismaUtils.getSearchKeywordObject(searchKeyword)
  } : filterObj;
  filterObj = status ? {
    ...filterObj, ...prismaUtils.getStatusQueryObject(status)
  } : filterObj;
  filterObj = type ? {
    ...filterObj, type
  } : filterObj;

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
    ...(status && { status }),
    ...(dueDate && {
      dueDate: new Date(dueDate).toISOString()
    }),
    ...(issueLink && { issueLink })
  };

  const createdNote = await prisma.PONote.create({
    data: noteDetails,
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
  const noteObj = await prisma.PONote.deleteMany({
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
