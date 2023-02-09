const poNotesController = require('../../src/controllers/poNotes.controller');
const poNotesServices = require('../../src/services/poNoteServices');

const { HttpError } = require('../../src/errors');
describe('get PO Notes (all/list)', () => {
  const poNotes = [
    {
      'noteId': 8,
      'type': 'AGENDA_ITEM',
      'note': 'string',
      'status': 'PENDING',
      'dueDate': null,
      'issueLink': null
    },
    {
      'noteId': 7,
      'type': 'KEY_DECISION',
      'note': 'string',
      'status': 'NONE',
      'dueDate': null,
      'issueLink': null
    }
  ];

  it('should return array of PO notes as objects', async () => {
    const mockReq = {
      query: {},
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = () => { };

    jest.spyOn(poNotesServices, 'getPONotesByQuickFilter').mockResolvedValue(poNotes);

    await poNotesController.listPONotes(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith(poNotes);
  });
  it('should return error when service throws error', async () => {
    const mockReq = {
      query: {
        xyz: ''
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    jest.spyOn(poNotesServices, 'getPONotesByQuickFilter').mockRejectedValue(new Error('Bad Request'));
    await poNotesController.listPONotes(mockReq, mockRes, next);
    expect(next).toBeCalledWith(new Error('Bad Request'));
  });
});

describe('get PO Notes by ID', () => {
  const poNote = {
    'noteId': 8,
    'type': 'AGENDA_ITEM',
    'note': 'string',
    'status': 'PENDING',
    'dueDate': null,
    'issueLink': null
  };

  it('should return PO notes as an object', async () => {
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
    const next = () => { };

    jest.spyOn(poNotesServices, 'getPONoteByID').mockResolvedValue(poNote);

    await poNotesController.detailPONote(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith(poNote);
  });
  it('should return error when service throws error', async () => {
    const mockReq = {
      params: {
        id: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    jest.spyOn(poNotesServices, 'getPONoteByID').mockRejectedValue(new Error('Bad Request'));
    await poNotesController.detailPONote(mockReq, mockRes, next);
    expect(next).toBeCalledWith(new Error('Bad Request'));
  });
});

describe('create PO Notes by ID', () => {
  const poNote = {
    'noteId': 8,
    'type': 'AGENDA_ITEM',
    'note': 'string',
    'status': 'PENDING',
    'dueDate': null,
    'issueLink': null
  };

  it('should return new created PO note as an object', async () => {
    const mockReq = {
      body: {
        'note': 'I\'m note',
        'type': 'AGENDA_ITEM'
      },
      params: {
        id: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = () => { };

    jest.spyOn(poNotesServices, 'createValidPONote').mockResolvedValue(poNote);

    await poNotesController.createPONote(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(201);
    expect(mockRes.json).toBeCalledWith(poNote);
  });
  it('should return error when there is empty/no body', async () => {
    const mockReq = {
      body: {
      },
      params: {
        id: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    jest.spyOn(poNotesServices, 'createValidPONote').mockRejectedValue(new Error('Bad Request'));
    await poNotesController.createPONote(mockReq, mockRes, next);
    expect(next).toBeCalledWith(new Error('Bad Request'));
  });
  it('should return error when service throws error', async () => {
    const mockReq = {
      body: {
        'note': 'I\'m note',
        'type': 'AGENDA_ITEM'
      },
      params: {
        id: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    jest.spyOn(poNotesServices, 'createValidPONote').mockRejectedValue(new Error('Bad Request'));
    await poNotesController.createPONote(mockReq, mockRes, next);
    expect(next).toBeCalledWith(new Error('Bad Request'));
  });
});

describe('update PO Notes by ID', () => {
  const poNote = {
    'noteId': 8,
    'type': 'AGENDA_ITEM',
    'note': 'string',
    'status': 'PENDING',
    'dueDate': null,
    'issueLink': null
  };

  it('should return updated PO note as an object', async () => {
    const mockReq = {
      body: {
        'note': 'I\'m note',
        'type': 'ACTION_ITEM',
        'dueDate': '2023-01-27',
        'status': 'COMPLETED',
        'issueLink': 'http://dummyUrl.com'
      },
      params: {
        id: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = () => { };

    jest.spyOn(poNotesServices, 'updatePONoteById').mockResolvedValue(poNote);

    await poNotesController.editPONote(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith(poNote);
  });
  it('should return error when there is empty/no body', async () => {
    const mockReq = {
      body: {
      },
      params: {
        id: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    jest.spyOn(poNotesServices, 'updatePONoteById').mockRejectedValue(new Error('Bad Request'));
    await poNotesController.editPONote(mockReq, mockRes, next);
    expect(next).toBeCalledWith(new Error('Bad Request'));
  });
  it('should return error when service throws error', async () => {
    const mockReq = {
      body: {
        'xyz': 'string',
        'type': 'ACTION_ITEM',
        'dueDate': '2023-01-27',
        'status': 'COMPLETED',
        'issueLink': 'http://dummyUrl.com'
      },
      params: {
        id: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    jest.spyOn(poNotesServices, 'updatePONoteById').mockRejectedValue(new Error('Bad Request'));
    await poNotesController.editPONote(mockReq, mockRes, next);
    expect(next).toBeCalledWith(new Error('Bad Request'));
  });
});

describe('SOFT delete PO Notes by ID', () => {
  const deleteNoteObj = {
    count: 1
  };

  it('should return 204 code with no response data', async () => {
    const mockReq = {
      body: {},
      params: {
        id: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = () => { };

    jest.spyOn(poNotesServices, 'softDeletePONoteById').mockResolvedValue(deleteNoteObj);

    await poNotesController.deletePONote(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(204);
    expect(mockRes.json).toBeCalled();
  });
  it('should return error when service throws error', async () => {
    const mockReq = {
      body: {},
      params: {
        id: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    jest.spyOn(poNotesServices, 'softDeletePONoteById').mockRejectedValue(new Error('Bad Request'));
    await poNotesController.deletePONote(mockReq, mockRes, next);
    expect(next).toBeCalledWith(new Error('Bad Request'));
  });
  it('should return error when invalid property is passed', async () => {
    const mockReq = {
      body: {},
      params: {
        k: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    jest.spyOn(poNotesServices, 'softDeletePONoteById').mockRejectedValue(new HttpError(400, 'Bad Request'));
    await poNotesController.deletePONote(mockReq, mockRes, next);
    expect(next).toBeCalledWith(new HttpError(400, 'Bad Request'));
  });
});

describe('HARD delete PO Notes by ID', () => {
  const deleteNoteObj = {
    count: 1
  };

  it('should return 204 code with no response data', async () => {
    const mockReq = {
      body: {
        'deleteType': 'HARD'
      },
      params: {
        id: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = () => { };

    jest.spyOn(poNotesServices, 'hardDeletePONoteById').mockResolvedValue(deleteNoteObj);

    await poNotesController.deletePONote(mockReq, mockRes, next);
    expect(mockRes.status).toBeCalledWith(204);
    expect(mockRes.json).toBeCalled();
  });
  it('should return error when service throws error', async () => {
    const mockReq = {
      body: {
        deleteType: 'HARD'
      },
      params: {
        id: 1
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    jest.spyOn(poNotesServices, 'hardDeletePONoteById').mockRejectedValue(new Error('Bad Request'));
    await poNotesController.deletePONote(mockReq, mockRes, next);
    expect(next).toBeCalledWith(new Error('Bad Request'));
  });
});