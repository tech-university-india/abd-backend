const teamRequestsServices = require('../../../src/services/dsm/teamRequests.services');
const teamRequestsControllers = require('../../../src/controllers/dsm/teamRequests.controller');
const mockTeamRequests = require('../../../mocks/dsm/teamRequests');
describe('Team Requests Controller', () => {
  describe('getTeamRequest', () => {
    it('should return all team Requests when it is called', async () => {
      const mockReq = {
        query: {},
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();
      jest.spyOn(teamRequestsServices, 'getAllTeamRequests').mockResolvedValue(mockTeamRequests);
      await(teamRequestsControllers.listTeamRequests(mockReq, mockRes, next));
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(mockTeamRequests);
    });
    it('should throw error when services throw error', async () => {
      const mockReq = {
        query: {},
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();
      jest.spyOn(teamRequestsServices, 'getAllTeamRequests').mockRejectedValue(new Error('Bad Request'));
      await(teamRequestsControllers.listTeamRequests(mockReq, mockRes, next));
      expect(next).toBeCalledWith(new Error('Bad Request'));
    });
  });
 
  describe('createTeamRequest', () => {
    it('should return team Request created when it is called', async () => {
      const mockReq = { 
        body:{
          ...mockTeamRequests[0]        
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();
      jest.spyOn(teamRequestsServices, 'createValidTeamRequest').mockResolvedValue(mockTeamRequests[0]);
      await(teamRequestsControllers.createTeamRequest(mockReq, mockRes, next));
      expect(mockRes.status).toBeCalledWith(201);
      expect(mockRes.json).toBeCalledWith(mockTeamRequests[0]);
    });
    it('should throw error when services throw error', async () => {
      const mockReq = {
        body:{
          ...mockTeamRequests[0]
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();
      jest.spyOn(teamRequestsServices, 'createValidTeamRequest').mockRejectedValue(new Error('Bad Request'));
      await(teamRequestsControllers.createTeamRequest(mockReq, mockRes, next));
      expect(next).toBeCalledWith(new Error('Bad Request'));
    });
  });
  describe('editTeamRequest', () => {
    it('should return team Request updated when it is called', async () => {
      const mockReq = { 
        body:{
          ...mockTeamRequests[0]        
        },
        params:{
          requestId: mockTeamRequests[0].requestId
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();
      jest.spyOn(teamRequestsServices, 'editTeamRequest').mockResolvedValue(mockTeamRequests[0]);
      await(teamRequestsControllers.editTeamRequest(mockReq, mockRes, next));
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(mockTeamRequests[0]);
    });
    it('should throw error when services throw error', async () => {
      const mockReq = {
        body:{
          ...mockTeamRequests[0]
        }
        ,
        params:{
          requestId: mockTeamRequests[0].requestId
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();
      jest.spyOn(teamRequestsServices, 'editTeamRequest').mockRejectedValue(new Error('Bad Request'));
      await(teamRequestsControllers.editTeamRequest(mockReq, mockRes, next));
      expect(next).toBeCalledWith(new Error('Bad Request'));
    });
  });
  describe('deleteTeamRequest', () => {
    it('should return status code 204 when data to delete is present', async () => {
      const mockReq = { 
        params:{
          requestId: mockTeamRequests[0].requestId
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();
      jest.spyOn(teamRequestsServices, 'deleteTeamRequest').mockResolvedValue();
      await(teamRequestsControllers.deleteTeamRequest(mockReq, mockRes, next));
      expect(mockRes.status).toBeCalledWith(204);
    });
    it('should throw error when data to delete is not present', async () => {
      const mockReq = {
        params:{
          requestId: 134
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();
      jest.spyOn(teamRequestsServices, 'deleteTeamRequest').mockRejectedValue(new Error('Bad Request'));
      await(teamRequestsControllers.deleteTeamRequest(mockReq, mockRes, next));
      expect(next).toBeCalledWith(new Error('Bad Request'));
    });
  });

});


