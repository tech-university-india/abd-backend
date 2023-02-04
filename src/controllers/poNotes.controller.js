const {
  getPaginationObject,
} = require('../utils/prismaUtils');

const {
  getPONoteByID,
  getPONotesByQuickFilter,
  createValidPONote,
  updatePONoteById,
  hardDeletePONoteById,
  softDeletePONoteById
} = require('../services/poNoteServices');

// controller to handle GET request for listing all po notes
const listPONotes = async (req, res, next) => {
  try {

    const {
      type,
      startDate,
      endDate,
      search,
      status,
      page,
      limit
    } = req.query;

    const paginateObj = getPaginationObject(page, limit);

    const filteredNotes =
      await getPONotesByQuickFilter(
        type,
        startDate,
        endDate,
        search,
        status,
        paginateObj
      );

    res.status(200).json(filteredNotes);
  }
  catch (er) {
    next(er);
  }
};

// controller to handle POST request for creating a po note
const createPONote = async (req, res, next) => {
  try {

    const {
      type, note,
      status, dueDate,
      issueLink
    } = req.body;

    const createdNote =
      await createValidPONote(
        type, note,
        status, dueDate,
        issueLink
      );

    res.status(201).json(createdNote);
  }
  catch (er) {
    next(er);
  }
};

// controller to handle GET request for getting a po note by id
const detailPONote = async (req, res, next) => {
  try {
    const noteId = req.params.id;
    const resultNote = await getPONoteByID(noteId);
    res.status(200).json(resultNote);
  }
  catch (er) {
    next(er);
  }
};

// controller to handle PATCH request for editing a po note by id
const editPONote = async (req, res, next) => {
  try {
    const noteId = req.params.id;

    const {
      note,
      status,
      dueDate,
      issueLink,
      type
    } = req.body;

    const updatedNote =
      await updatePONoteById(
        noteId, note,
        status, dueDate,
        issueLink, type
      );

    res.status(200).json(updatedNote);
  }
  catch (er) {
    next(er);
  }
};

// controller to handle DELETE request for deleting a po note by id
const deletePONote = async (req, res, next) => {
  try {
    const noteId = req.params.id;
    const deleteType = req.body.deletetype;

    deleteType === 'HARD'?
      await hardDeletePONoteById(noteId) :
      await softDeletePONoteById(noteId);

    res.status(204).json();
  }
  catch (er) {
    next(er);
  }
};

module.exports = {
  getPONoteByID,
  listPONotes,
  createPONote,
  detailPONote,
  editPONote,
  deletePONote,
};
