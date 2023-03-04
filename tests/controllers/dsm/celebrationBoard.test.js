const celebrationBoardController = require('../../../src/controllers/dsm/celebrationBoard.controller');
const celebrationBoardServices = require('../../../src/services/dsm/celebrationBoard.services');
const celebrations = require('../../../mocks/dsm/celebration');

describe('When team members fetch all celebrations', () => {
  it('should return a list of all celebrations', async () => {
    jest.spyOn(celebrationBoardServices, 'listCelebrations').mockResolvedValue(celebrations);
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await celebrationBoardController.listCelebrations(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(celebrations);
  });

  it('should return a 500 status code if there is an error', async () => {
    jest.spyOn(celebrationBoardServices, 'listCelebrations').mockRejectedValue(new Error('Bad Request'));
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();
    await celebrationBoardController.listCelebrations(req, res, next);
    expect(next).toHaveBeenCalledWith(new Error('Bad Request'));
  });
});

describe('When team members fetch a celebration by id', () => {
  const celebration = celebrations[0];
  it('should return a celebration by id', async () => {
    jest.spyOn(celebrationBoardServices, 'getCelebrationById').mockResolvedValue(celebration);
    const req = {
      params: { celebrationId: 1 }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await celebrationBoardController.detailCelebration(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(celebration);
  });

  it('should return a 500 status code if there is an error', async () => {
    jest.spyOn(celebrationBoardServices, 'getCelebrationById').mockRejectedValue(new Error('Bad Request'));
    const req = {
      params: { celebrationId: 1 }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();
    await celebrationBoardController.detailCelebration(req, res, next);
    expect(next).toHaveBeenCalledWith(new Error('Bad Request'));
  });
});

describe('When team members create a celebration', () => {
  const newCelebration = celebrations[0];
  it('should create a new celebration', async () => {
    jest.spyOn(celebrationBoardServices, 'createCelebration').mockResolvedValue(newCelebration);
    const req = {
      body: {
        content: 'Congrats Team!',
        type: 'CELEBRATION'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await celebrationBoardController.createCelebration(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Celebration created successfully', newCelebration });
  });

  it('should return a 500 status code if there is an error', async () => {
    jest.spyOn(celebrationBoardServices, 'createCelebration').mockRejectedValue(new Error('Bad Request'));
    const req = {
      body: {
        content: 'Congrats Team!',
        type: 'CELEBRATION'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();
    await celebrationBoardController.createCelebration(req, res, next);
    expect(next).toHaveBeenCalledWith(new Error('Bad Request'));
  });
});

describe('When team members update a celebration', () => {
  const updatedCelebration = celebrations[0];
  it('should update a celebration', async () => {
    jest.spyOn(celebrationBoardServices, 'updateCelebrationById').mockResolvedValue(updatedCelebration);
    const req = {
      query: {},
      params: { celebrationId: 1 },
      body: {
        content: 'Congrats Team!'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();
    await celebrationBoardController.updateCelebration(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Celebration updated successfully', updatedCelebration });
  });

  it('should return a 500 status code if there is an error', async () => {
    jest.spyOn(celebrationBoardServices, 'updateCelebrationById').mockRejectedValue(new Error('Bad Request'));
    const req = {
      query: {},
      params: { celebrationId: 1 },
      body: {
        content: 'Congrats Team ABD!'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();
    await celebrationBoardController.updateCelebration(req, res, next);
    expect(next).toHaveBeenCalledWith(new Error('Bad Request'));
  });
});

describe('When team members delete a celebration', () => {
  it('should delete a celebration', async () => {
    jest.spyOn(celebrationBoardServices, 'deleteCelebrationById').mockResolvedValue();
    const req = {
      params: { celebrationId: 1 }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();
    await celebrationBoardController.deleteCelebration(req, res, next);
    expect(res.status).toHaveBeenCalledWith(204);
  });

  it('should return a 500 status code if there is an error', async () => {
    jest.spyOn(celebrationBoardServices, 'deleteCelebrationById').mockRejectedValue(new Error('Bad Request'));
    const req = {
      params: { celebrationId: 1 }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();
    await celebrationBoardController.deleteCelebration(req, res, next);
    expect(next).toHaveBeenCalledWith(new Error('Bad Request'));
  });
});
