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

const filterToDifferentTypes = (noteItems) => {
  const filteredNotes = {};
  noteItems.forEach(noteItem => {
    filteredNotes[noteItem.type] ?
      filteredNotes[noteItem.type].push(noteItem) :
      filteredNotes[noteItem.type] = [noteItem];
  });
  return filteredNotes;
};

// const ifNoteExists = async (noteId) => {
//   const noteObj = await prisma.PONote.findUnique({
//     where: {
//       noteId
//     }
//   });

//   return (Object.keys(noteObj).length !== 0 && !noteObj.isDeleted) ?
//     true : false;
// };

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

const getSearchKeywordObject = (searchKeyword) => {
  return {
    note: {
      contains: searchKeyword,
      mode: 'insensitive',
    }
  };
};

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

const getPONotesByQuickFilter = async (
  type,
  startDate = null,
  endDate = null,
  searchKeyword = null,
  status = null,
  paginationObj
) => {
  let filterObj = {};

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
  return filterToDifferentTypes(notes);
};

const getPONoteByID = async (noteId) => {
  const noteObj = await prisma.PONote.findFirst({
    where: {
      noteId,
      isDeleted: false
    },
    ...selectOnlyValidPONoteFields
  });
  if (!noteObj) throw new HttpError(404, 'No Record Found');
  return noteObj;
};

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

  const createdActionItem = await prisma.PONote.create({
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

  return createdActionItem;
};

const updatePONoteById = async (
  noteId, note,
  status, dueDate,
  issueLink, type
) => {

  const updateDetails = {
    ...(note && { note }),
    ...(status && { status }),
    ...(dueDate && { dueDate }),
    ...(issueLink && { issueLink }),
    ...(type && { type })
  };

  if (Object.keys(updateDetails) === 0)
    throw new HttpError(400, 'No Data to Update');

  const noteObj =
    await prisma.PONote.update({
      where: {
        noteId,
        isDeleted: false
      },
      updateDetails,
      ...selectOnlyValidPONoteFields
    });

  return noteObj;
};

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

  if (noteObj.count === 0) throw new HttpError(400, 'No Record Found to Delete');
  return noteObj;
};

const hardDeletePONoteById = async (noteId) => {
  const noteObj = await prisma.PONote.delete({
    where: {
      noteId,
      isDeleted: false
    },
  });

  if (noteObj.count === 0) throw new HttpError(404, 'No Record Found to Delete');
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