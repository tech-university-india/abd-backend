const celebrationBoardServices = require('../../services/dsm/celebrationBoard.services');

// userId is hardcoded for now
// but, actual userId will be passed from the frontend (in header)
const userId = 'anonymous';

// controller to handle GET request for listing all celebrations
const listCelebrations = async (req, res, next) => {
  try {
    const celebrations =
      await celebrationBoardServices.listCelebrations();
    res.status(200).json(celebrations);
  }
  catch (er) {
    next(er);
  }
};

// controller to handle GET request for getting a celebration by id
const detailCelebration = async (req, res, next) => {
  try {
    const celebrationId = parseInt(req.params.id);
    const celebration =
      await celebrationBoardServices.getCelebrationById(celebrationId);
    res.status(200).json(celebration);
  }
  catch (er) {
    next(er);
  }
};

// controller to handle POST request for creating a celebration
const createCelebration = async (req, res, next) => {
  try {
    const { content, type, isAnonymous } = req.body;
    const newCelebration =
      await celebrationBoardServices.createCelebration(userId, content, type, isAnonymous);
    res.status(201).json({ message: 'Celebration created successfully', newCelebration });
  }
  catch (er) {
    next(er);
  }
};

// controller to handle PATCH request for updating a celebration
const updateCelebration = async (req, res, next) => {
  try {
    const celebrationId = parseInt(req.params.id);
    const { content, type, isAnonymous } = req.body;
    const updatedCelebration =
      await celebrationBoardServices.updateCelebrationById(celebrationId, content, type, isAnonymous);
    res.status(200).json({ message: 'Celebration updated successfully', updatedCelebration });
  }
  catch (er) {
    next(er);
  }
};

// controller to handle DELETE request for deleting a celebration
const deleteCelebration = async (req, res, next) => {
  try {
    const celebrationId = parseInt(req.params.id);
    await celebrationBoardServices.deleteCelebrationById(celebrationId);
    res.status(204).end();
  }
  catch (er) {
    next(er);
  }
};

// controller to handle PATCH request for updating a reactions
const updateReaction = async (req, res, next) => {
  try {
    const celebrationId = parseInt(req.params.id);
    const { isReacted } = req.body;
    const updatedReaction =
      await celebrationBoardServices.updateReaction(celebrationId, userId, isReacted);
    res.status(200).json({ message: 'Reaction updated successfully', updatedReaction });
  }
  catch (er) {
    next(er);
  }
};


module.exports = {
  listCelebrations,
  detailCelebration,
  createCelebration,
  updateCelebration,
  deleteCelebration,
  updateReaction,
};