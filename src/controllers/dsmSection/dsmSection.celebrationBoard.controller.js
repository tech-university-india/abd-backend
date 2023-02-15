const celebrationBoardServices = require('../../services/dsmSection/dsmSection.celebrationBoard.services');

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
    const { author, content } = req.body;
    const newCelebration =
      await celebrationBoardServices.createCelebration(author, content);
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
    const { content } = req.body;
    const updatedCelebration =
      await celebrationBoardServices.updateCelebrationById(celebrationId, content);
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

module.exports = {
  listCelebrations,
  detailCelebration,
  createCelebration,
  updateCelebration,
  deleteCelebration,
};