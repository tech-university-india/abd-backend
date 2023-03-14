const announcementController = require('../../../src/controllers/dsm/announcements.controller');
const announcementServices = require('../../../src/services/dsm/announcements.services');
const getRandomNumber = require('../../../src/utils/randomGenerator');
const { announcementList, announcementByID } = require('../../../src/mocks/dsm/announcements');

describe('When any team member/leadership or PO himself tries to fetch all the announcements',()=>{
  const announcements = announcementList;

  it('should return array of announcements as objects', async () => {
    const mockReq = {
      query: {},
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    jest.spyOn(announcementServices, 'getAnnouncements').mockResolvedValue(announcements);

    await announcementController.listAnnouncements(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith(announcements);
  });

  it('should return error when service throws error', async () => {
    const mockReq = {
      query: {},
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    jest.spyOn(announcementServices, 'getAnnouncements').mockRejectedValue(new Error('Bad Request'));

    await announcementController.listAnnouncements(mockReq, mockRes, next);
    expect(next).toBeCalledWith(new Error('Bad Request'));
  });
});

describe('When any team member/leadership or PO himself tries to fetch an announcement',()=>{
  const announcement = announcementByID;

  it('should return the announcement object', async () => {
    const mockReq = {
      query: {},
      params: {
        id: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    jest.spyOn(announcementServices, 'getAnnouncementByID').mockResolvedValue(announcement);

    await announcementController.detailAnnouncement(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith(announcement);
  });

  it('should return error when service throws error', async () => {
    const mockReq = {
      query: {},
      params: {
        id: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    jest.spyOn(announcementServices, 'getAnnouncementByID').mockRejectedValue(new Error('Bad Request'));

    await announcementController.detailAnnouncement(mockReq, mockRes, next);
    expect(next).toBeCalledWith(new Error('Bad Request'));
  });
});

describe('When any team member/leadership or PO himself tries to create an announcements',()=>{
  const announcement = announcementByID;

  it('should return the announcement object', async () => {
    const mockReq = {
      query: {},
      body: {
        content: 'This is the first announcement'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    jest.spyOn(announcementServices, 'createAnnouncement').mockResolvedValue(announcement);
    jest.spyOn(getRandomNumber, 'getRandomNumber').mockResolvedValue(1);
    
    await announcementController.createAnnouncement(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(201);
    expect(mockRes.json).toBeCalledWith(announcement);
  });

  it('should return error when service throws error', async () => {
    const mockReq = {
      query: {},
      body: {
        content: 'This is the first announcement'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    jest.spyOn(announcementServices, 'createAnnouncement').mockRejectedValue(new Error('Bad Request'));

    await announcementController.createAnnouncement(mockReq, mockRes, next);
    expect(next).toBeCalledWith(new Error('Bad Request'));
  });
});

describe('when the author of the announcement tries to update the announcement',()=>{
  const announcement = announcementByID;

  xit('should throw error if user is not the author of the announcement', async () => {
  });

  it('should return the updated announcement object', async () => {
    const mockReq = {
      query: {},
      params: {
        id: 1
      },
      body: {
        content: 'This is the updated announcement'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    jest.spyOn(announcementServices, 'editAnnouncement').mockResolvedValue({...announcement, content: 'This is the updated announcement'});

    await announcementController.editAnnouncement(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith({...announcement,content: 'This is the updated announcement'});
  });

  it('should return error when service throws error', async () => {
    const mockReq = {
      query: {},
      params: {
        id: 1
      },
      body: {
        content: 'This is the updated announcement'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    jest.spyOn(announcementServices, 'editAnnouncement').mockRejectedValue(new Error('Bad Request'));

    await announcementController.editAnnouncement(mockReq, mockRes, next);
    expect(next).toBeCalledWith(new Error('Bad Request'));
  });
});

describe('when the author of the announcement tries to delete the announcement',()=>{
  xit('should throw error if user is not the author of the announcement', async () => {
  });

  it('should return 204 code with no content', async () => {
    const mockReq = {
      query: {},
      params: {
        id: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    jest.spyOn(announcementServices, 'deleteAnnouncement').mockResolvedValue();

    await announcementController.deleteAnnouncement(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(204);
    expect(mockRes.json).toBeCalledWith();
  });

  it('should return error when service throws error', async () => {
    const mockReq = {
      query: {},
      params: {
        id: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    jest.spyOn(announcementServices, 'deleteAnnouncement').mockRejectedValue(new Error('Bad Request'));

    await announcementController.deleteAnnouncement(mockReq, mockRes, next);
    expect(next).toBeCalledWith(new Error('Bad Request'));
  });
});