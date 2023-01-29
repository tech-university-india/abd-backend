const {
  getPaginationObject,
  validateDateFormat,
  formatToDate,
  getValidStatusEnum,
  getValidTypeEnum
} = require('../utils/prismaUtils');

const {
  getPONoteByID,
  getPONotesByQuickFilter,
  createValidPONote,
  updatePONoteById,
  hardDeletePONoteById,
  softDeletePONoteById
} = require('../services/poNoteServices');

const listPONotes = async (req, res) => {
  try {

    const type = getValidTypeEnum(req.query.type);
    const paginateObj = getPaginationObject(req.query);
    const startDate = formatToDate(
      req?.query?.startdate ||
      req?.query?.date
    );
    const endDate = formatToDate(req?.query?.enddate);
    const searchKeyword = req?.query?.search;
    const status = getValidStatusEnum(req?.query?.status);

    const filteredNotes =
      await getPONotesByQuickFilter(
        type,
        startDate,
        endDate,
        searchKeyword,
        status,
        paginateObj
      );

    res.status(200).send({
      result: filteredNotes
    });
  }
  catch (er) {
    res.status(404).send({
      message: er.message
    });
  }
};

const createPONote = async (req, res) => {
  try {

    // optional
    const validDueDate = req.body?.duedate ?
      validateDateFormat(req.body.duedate) :
      true;
    // ------

    const createdNote = (
      req.body?.note &&
      getValidTypeEnum(req.body?.type) &&
      validDueDate
    ) ?
      await createValidPONote(req.body) :
      res.status(400).send({
        message: 'Bad Request - Invalid Input'
      });

    res.status(201).send({
      result: createdNote
    });
  }
  catch (er) {
    res.status(400).send({
      message: er.message
    });
  }
};

const detailPONote = async (req, res) => {
  try {
    const noteId = req.params.id;

    const resultNote = noteId ?
      await getPONoteByID(Number(noteId)) :
      res.status(400).send({
        message: 'Bad Request - Invalid Input'
      });

    resultNote ?
      res.status(200).send({
        result: resultNote
      }) :
      res.status(404).send({
        message: 'Not Found!'
      });
  }
  catch (er) {
    res.status(400).send({
      message: er.message
    });
  }
};

const editPONote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const data = req.body;

    // // optional
    // const type = getValidTypeEnum(req.body.type);
    // // ------

    const updatedNote = data ?
      await updatePONoteById(Number(noteId), data) :
      res.status(400).send({
        message: 'Empty Note'
      });

    updatedNote ?
      res.status(200).send(200, {
        result: updatedNote
      }) :
      res.status(404).send(200, {
        message: 'Not Found!'
      });
  }
  catch (er) {
    res.status(400).send({
      message: er.message
    });
  }
};

const deletePONote = async (req, res) => {
  try {
    const noteId = Number(req.params.id);

    // optional
    // const type = getValidTypeEnum(req.body.type);
    const deleteType = req.body.deletetype;
    // ------

    const deletedNote = deleteType === 'hard' ?
      await hardDeletePONoteById(noteId) :
      await softDeletePONoteById(noteId);

    deletedNote ?
      res.status(204).send({
        result: deletedNote
      }) :
      res.status(404).send(200, {
        message: 'Not Found!'
      });

  }
  catch (er) {
    res.status(400).send({
      message: er.message
    });
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
