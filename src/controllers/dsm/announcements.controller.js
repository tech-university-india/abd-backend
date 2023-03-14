const announcementServices = require('../../services/dsm/announcements.services');
const { getRandomNumber } = require('../../utils/randomGenerator');

/**
  * Controller to handle GET request for listing all announcements
  * @param {Object} req - Express request object
  * @param {Object} res - Express response object
  * @param {Function} next - Express next middleware function
*/
const listAnnouncements = async (req, res, next) => {
  try {
    const announcements = await announcementServices.getAnnouncements();
    res.status(200).json(announcements);
  }
  catch (er) {
    next(er);
  }
};

/** 
  * Controller to handle GET request for getting an announcement by id
  * @param {Object} req - Express request object
  * @param {Object} res - Express response object
  * @param {Function} next - Express next middleware function
*/
const detailAnnouncement = async (req, res, next) => {
  try {
    const announcementId = req.params.id;
    const resultAnnouncement = await announcementServices.getAnnouncementByID(announcementId);
    res.status(200).json(resultAnnouncement);
  }
  catch (er) {
    next(er);
  }
};

/** 
  * Controller to handle POST request for creating an announcement
  * @param {Object} req - Express request object
  * @param {Object} res - Express response object
  * @param {Function} next - Express next middleware function
*/
const createAnnouncement = async (req, res, next) => {
  try {
    // author ID is set as random(between 1 to 1000) for now
    // const author = req.user.id;
    const author = getRandomNumber(1, 1000).toString();
    const content = req.body.content;
    const resultAnnouncement = await announcementServices.createAnnouncement(author, content);
    res.status(201).json(resultAnnouncement);
  }
  catch (er) {
    next(er);
  }
};

/**
  * Controller to handle PATCH request for editing an announcement
  * @param {Object} req - Express request object
  * @param {Object} res - Express response object
  * @param {Function} next - Express next middleware function
*/
const editAnnouncement = async (req, res, next) => {
  try {
    //TODO: check if the user is the author of the announcement
    const announcementId = req.params.id;
    const content = req.body.content;
    const resultAnnouncement = await announcementServices.editAnnouncement(announcementId, content);
    res.status(200).json(resultAnnouncement);
  }
  catch (er) {
    next(er);
  }
};

/** 
  * Controller to handle DELETE request for deleting an announcement
  * @param {Object} req - Express request object
  * @param {Object} res - Express response object
  * @param {Function} next - Express next middleware function
*/
const deleteAnnouncement = async (req, res, next) => {
  try {
    // TODO: check if the user is the author of the announcement
    const announcementId = req.params.id;
    await announcementServices.deleteAnnouncement(announcementId);
    res.status(204).json();
  }
  catch (er) {
    next(er);
  }
};

module.exports = {
  listAnnouncements,
  detailAnnouncement,
  createAnnouncement,
  editAnnouncement,
  deleteAnnouncement
};