const { HttpError } = require('../../errors');
const prisma = require('../../prismaClient');

const selectOnlyValidAnnouncementFields = {
  select: {
    announcementId: true,
    author: true,
    content: true,
    createdAt: true,
  }
};

/**
  * Service to list all the announcements
  * @returns {Object} - List of announcements
*/
const getAnnouncements = async () => {
  const announcements = await prisma.Announcement.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    ...selectOnlyValidAnnouncementFields
  });
  return announcements;
};

/** 
  * Service to list announcement by id
  * @param {Number} announcementId - Announcement id
  * @returns {Object} - Announcement object
  * @throws {HttpError} - Throws an error if announcement not found
*/
const getAnnouncementByID = async (announcementId) => {
  const announcement = await prisma.Announcement.findUnique({
    where: {
      announcementId
    },
    ...selectOnlyValidAnnouncementFields
  });
  if (!announcement) {
    throw new HttpError(404, 'Announcement not found');
  }
  return announcement;
};

/**
  * Service to create announcement
  * @param {String} author - user id of the author
  * @param {String} content - content of the announcement
  * @returns {Object} - Announcement object
*/
const createAnnouncement = async (author, content) => {
  const announcement = await prisma.Announcement.create({
    data: {
      author,
      content
    },
    ...selectOnlyValidAnnouncementFields
  });
  return announcement;
};

/** 
  * Service to edit announcement
  * @param {Number} announcementId - Announcement id
  * @param {String} content - new content of the announcement
  * @returns {Object} - Updated announcement object
  * @throws {HttpError} - Throws an error if announcement not found
*/
const editAnnouncement = async (announcementId, content) => {
  const announcement = await prisma.Announcement.update({
    where: {
      announcementId
    },
    data: {
      content
    },
    ...selectOnlyValidAnnouncementFields
  });
  if (!announcement) {
    throw new HttpError(404, 'Announcement not found');
  }
  return announcement;
};

/** 
  * Service to delete announcement by id
  * @param {Number} announcementId - Announcement id
  * @returns {void} - No return value
  * @throws {HttpError} - Throws an error if announcement not found
*/
const deleteAnnouncement = async (announcementId) => {
  const announcement = await prisma.Announcement.delete({
    where: {
      announcementId
    },
    ...selectOnlyValidAnnouncementFields
  });
  if (!announcement) {
    throw new HttpError(404, 'Announcement not found');
  }
};

module.exports={
  getAnnouncements,
  getAnnouncementByID,
  createAnnouncement,
  editAnnouncement,
  deleteAnnouncement
};