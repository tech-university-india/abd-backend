const announcementServices = require('../../../src/services/dsm/announcements.services');
const prisma = require('../../../src/prismaClient');
const { HttpError } = require('../../../src/errors');
const { mockAnnouncementList, mockAnnouncementByID } = require('../../../src/mocks/dsm/announcements');

describe('Announcement Services', () => {
  describe('getAnnouncements', () => {
    it('should return an array of announcements', async () => {
      const mockAnnouncements = mockAnnouncementList;
      jest.spyOn(prisma.Announcement, 'findMany').mockResolvedValue(mockAnnouncements);
      const announcements = await announcementServices.getAnnouncements();
      expect(announcements).toBeInstanceOf(Array);
    });
  });

  describe('getAnnouncementByID', () => {
    it('should return an announcement object', async () => {
      const mockAnnouncement = mockAnnouncementByID;
      jest.spyOn(prisma.Announcement, 'findUnique').mockResolvedValue(mockAnnouncement);
      const announcement = await announcementServices.getAnnouncementByID(1);
      expect(announcement).toBeInstanceOf(Object);
    });

    it('should throw an error if announcement not found', async () => {
      jest.spyOn(prisma.Announcement, 'findUnique').mockResolvedValue(null);
      await expect(announcementServices.getAnnouncementByID(1)).rejects.toThrowError(new HttpError(404, 'Announcement not found'));
    });
  });

  describe('createAnnouncement', () => {
    it('should return an announcement object', async () => {
      const mockAnnouncement = mockAnnouncementByID;
      jest.spyOn(prisma.Announcement, 'create').mockResolvedValue(mockAnnouncement);
      const announcement = await announcementServices.createAnnouncement('1', 'test');
      expect(announcement).toBeInstanceOf(Object);
    });
  });

  describe('editAnnouncement', () => {
    it('should return the updated announcement object', async () => {
      const mockAnnouncement = mockAnnouncementByID;
      jest.spyOn(prisma.Announcement, 'findUnique').mockResolvedValue(mockAnnouncement);
      jest.spyOn(prisma.Announcement, 'update').mockResolvedValue({...mockAnnouncement, content: 'updated-test'});
      const announcement = await announcementServices.editAnnouncement(1, 'updated-test');
      expect(announcement).toBeInstanceOf(Object);
    });

    it('should throw an error if announcement not found', async () => {
      jest.spyOn(prisma.Announcement, 'findUnique').mockResolvedValue(null);
      await expect(announcementServices.editAnnouncement(1, 'updated-test')).rejects.toThrowError(new HttpError(404, 'Announcement not found'));
    });
  });

  describe('deleteAnnouncement', () => {
    it('should delete the announcement', async () => {
      const mockAnnouncement = mockAnnouncementByID;
      jest.spyOn(prisma.Announcement, 'findUnique').mockResolvedValue(mockAnnouncement);
      jest.spyOn(prisma.Announcement, 'delete').mockResolvedValue();
      await announcementServices.deleteAnnouncement(1);
      expect(prisma.Announcement.delete).toBeCalled();
    });
    it('should throw an error if announcement not found', async () => {
      jest.spyOn(prisma.Announcement, 'findUnique').mockResolvedValue(null);
      await expect(announcementServices.deleteAnnouncement(1)).rejects.toThrowError(new HttpError(404, 'Announcement not found'));
    });
  });
});