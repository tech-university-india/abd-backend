const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const {
  filterToDiffentTypes
} = require('../utils/prismaUtilis');

const ifNoteExists = async (noteId) => {
  const item = await prisma.PONote.findUnique({
    where: {
      noteId
    }
  });

  return (Object.keys(item).length !== 0 && !item.deleted) ?
    true : false;
};

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
  const items = await prisma.PONote.findMany({
    where: {
      ...filterObj,
      deleted: false
    },
    orderBy: {
      createdAt: 'desc',
    },
    ...paginationObj
  }
  );
  return filterToDiffentTypes(items);
};

const getPONoteByID = async (noteId) => {
  const item = await prisma.PONote.findUnique({
    where: {
      noteId
    },
  });
  return item?.deleted ? null : item;
};

const createValidPONote = async (noteDetails) => {
  const dueDate = noteDetails.duedate;
  const type = noteDetails.type;
  const createdActionItem = await prisma.PONote.create({
    data: {
      ...noteDetails,
      ...(type === 'KEY_DECISION' && {
        status: 'NONE'
      }),
      ...(type === 'ACTION_ITEM' && dueDate && {
        dueDate: new Date(dueDate).toISOString()
      })
    }
  });
  return createdActionItem;
};

const updatePONoteById = async (noteId, data) => {

  const item = await ifNoteExists(noteId) ?
    await prisma.PONote.update({
      where: {
        noteId
      },
      data
    }) : null;

  return item;
};

const softDeletePONoteById = async (noteId) => {
  const item = await ifNoteExists(noteId) ?
    await prisma.PONote.update({
      where: {
        noteId
      },
      data: {
        deleted: true
      }
    }) : null;

  return item;
};

const hardDeletePONoteById = async (noteId) => {
  const item = await ifNoteExists(noteId) ?
    await prisma.PONote.delete({
      where: {
        noteId
      }
    }) : null;

  return item;
};

module.exports = {
  getPONoteByID,
  getPONotesByQuickFilter,
  createValidPONote,
  updatePONoteById,
  hardDeletePONoteById,
  softDeletePONoteById
};