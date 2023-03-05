const prisma = require('../../../src/prismaClient');
const teamRequestsServices = require('../../../src/services/dsm/teamRequests.services');
const prismaUtils = require('../../../src/utils/prismaUtils');
const teamRequests = require('../../../mocks/dsm/teamRequests');
const { HttpError } = require('../../../src/errors');
const selectOnlyValidTeamrequestsFields = {
  select: {
    requestId: true,
    author: true,
    content: true,
    status: true,
    type: true,
    createdAt: true,
    taggedIndividuals: true,
  }
};
describe('Team Request Services', () => {
  describe('Create Team request', () => {
    it('should create a valid team request', async () => {
      const spiedCreateTeamRequest = jest.spyOn(prisma.Request, 'create').mockResolvedValue(teamRequests[0]);
      const mock ={
        'author': 'string',
        'content': 'string',
        'status': 'PENDING',
        'type': 'RESOURCE',
        'createdAt': '2023-03-04T12:11:41.080Z',
        'taggedIndividuals': []
      };
      const returnedValue = await teamRequestsServices.createValidTeamRequest(...Object.values(mock));
      expect(spiedCreateTeamRequest).toBeCalledWith(
        {
          data: {
            ...mock
          },
          ...selectOnlyValidTeamrequestsFields
        }
      );
      expect (returnedValue).toEqual(teamRequests[0]);
    });
  });  
  describe('Edit team request', () => {
    it('should update the team request when correct data is passed', async () => {
      const spiedEditTeamRequest = jest.spyOn(prisma.Request, 'update').mockResolvedValue(teamRequests[0]);
      const mock ={
        'requestId': 28,
        'author': 'string',
        'content': 'string',
        'status': 'PENDING',
        'type': 'RESOURCE',
        'createdAt': '2023-03-04T12:11:41.080Z',
        'taggedIndividuals': []
      };
      const mockCalledValue ={
        'author': 'string',
        'content': 'string',
        'status': 'PENDING',
        'type': 'RESOURCE',
        'createdAt': '2023-03-04T12:11:41.080Z',
        'taggedIndividuals': []
      };
      const returnedValue = await teamRequestsServices.editTeamRequest(...Object.values(mock));
      expect(spiedEditTeamRequest).toBeCalledWith(
        {
          data: {
            ...mockCalledValue 
          },
          where:{
            requestId: mock.requestId
          },
          ...selectOnlyValidTeamrequestsFields
        }
      );
      expect (returnedValue).toEqual(teamRequests[0]);
    });
  }); 
  describe('Edit team request', () => {
    it('should throw error when data to update not present', async () => {
      jest.spyOn(prisma.Request, 'update').mockResolvedValue(undefined);
      await expect(teamRequestsServices.editTeamRequest(1)).rejects.toThrow(new HttpError(404, 'Team Request not found'));
    });
  });   
  describe('Delete team request', () => {
    it('should delete the team request when correct data is passed', async () => {
      const spiedDeleteTeamRequest = jest.spyOn(prisma.Request, 'delete').mockResolvedValue({});
      await teamRequestsServices.deleteTeamRequest(
        teamRequests[0].requestId
      );
      expect(spiedDeleteTeamRequest).toBeCalledWith({
        where: {
          requestId: teamRequests[0].requestId
        }
      });
    });
  });
  describe('Delete team request', () => {
    it('should throw error when data to delete not present', async () => {
      jest.spyOn(prisma.Request, 'delete').mockResolvedValue(undefined);
      await expect(teamRequestsServices.deleteTeamRequest(1)).rejects.toThrow(new HttpError(404, 'Team Request not found'));
    });
  });
  describe('Get Team Request', () => {
    it('should get all the team request when correct data is passed', async () => {
      const mockQueryParams={
        author:'string',
        startDate:'2023-03-04',
        endDate:'2023-03-04',
        searchKeyword:'string',
        status:'PENDING',
        page:1,
        limit:10         
      }; 
      const mockPaginationResult={
        page:1,
        limit:10         
      };   
      const mockFilterResult={
        author:'string',
        startDate:'2023-03-04',
        endDate:'2023-03-04',
        searchKeyword:'string',
        status:'PENDING'
      };
      const spiedGetTeamRequest = jest.spyOn(prisma.Request, 'findMany').mockResolvedValue(teamRequests);
      jest.spyOn(prismaUtils, 'getPaginationObject').mockReturnValue(mockPaginationResult);
      jest.spyOn(prismaUtils, 'queryParamFilterTeamRequests').mockReturnValue(mockFilterResult);    
      const result = await teamRequestsServices.getAllTeamRequests(
        ...Object.values(mockQueryParams)
      );
      expect(spiedGetTeamRequest).toBeCalledWith({
        where: {
          ...mockFilterResult   
        },
        orderBy: {
          createdAt: 'desc',
        },
        ...mockPaginationResult,
        ...selectOnlyValidTeamrequestsFields
      });
      expect (result).toEqual(teamRequests);
    });
  });
});
