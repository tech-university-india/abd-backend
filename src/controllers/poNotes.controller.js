const {
  getPaginationObject,
  validateDateFormate,
  formateToDate,
  getValidStatusEnum,
  getValidTypeEnum
} = require('../utils/prismaUtilis');

const {
  getPoNoteByID,
  getPoNotesByQuickFilter,
  createValidPoNote,
  updatePoNoteById,
  hardDeletePoNoteById,
  softDeletePoNoteById
} = require('../services/poNoteServices');

const listPoNotes = async (req, res) => {
  try {

    const type = getValidTypeEnum(req.query.type);
    const paginateObj = getPaginationObject(req.query);
    const startDate = formateToDate(
      req?.query?.startdate ||
      req?.query?.date
    );
    const endDate = formateToDate(req?.query?.enddate);
    const searchKeyword = req?.query?.search;
    const status = getValidStatusEnum(req?.query?.status);

    const filteredNotes =
      await getPoNotesByQuickFilter(
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

const createPoNote = async (req, res) => {
  try {

    // optional
    const validDueDate = req.body?.duedate ?
      validateDateFormate(req.body.duedate) :
      true;
    // ------

    const createdNote = (
      req.body?.note &&
      getValidTypeEnum(req.body?.type) &&
      validDueDate
    ) ?
      await createValidPoNote(req.body) :
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

const detailPoNote = async (req, res) => {
  try {
    const noteId = req.params.id;

    const resultNote = noteId ?
      await getPoNoteByID(Number(noteId)) :
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

const editPoNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const data = req.body;

    // // optional
    // const type = getValidTypeEnum(req.body.type);
    // // ------

    const updatedNote = data ?
      await updatePoNoteById(Number(noteId), data) :
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

const deletePoNote = async (req, res) => {
  try {
    const noteId = Number(req.params.id);

    // optional
    // const type = getValidTypeEnum(req.body.type);
    const deleteType = req.body.deletetype;
    // ------

    const deletedNote = deleteType === 'hard' ?
      await hardDeletePoNoteById(noteId) :
      await softDeletePoNoteById(noteId);

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
  getPoNoteByID,
  listPoNotes,
  createPoNote,
  detailPoNote,
  editPoNote,
  deletePoNote,
};
