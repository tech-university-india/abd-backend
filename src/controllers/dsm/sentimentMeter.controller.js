const sentimentMeterService = require('../../services/dsm/sentimentMeter.services');
const userAnonmyous = 'anonymous';

const createSentiment = async (req, res, next) => {
  try {
    const {sentiment } = req.body;
    const newSentiment = await sentimentMeterService.createSentiment(
      userAnonmyous,
      sentiment
    );
    res.status(201).json(newSentiment);
  } catch (err) {
    next(err);
  }
};

const detailSentiment = async (req, res, next) => {
  try {
    const sentimentId = parseInt(req.params.id);
    const sentiment = await sentimentMeterService.getSentimentById(
      sentimentId
    );
    res.status(200).json(sentiment);
  } catch (err) {
    next(err);
  }
};

const updateSentiment = async (req, res, next) => {
  try {
    const sentimentId = parseInt(req.params.id);
    const { sentiment } = req.body;
    const updatedSentiment = await sentimentMeterService.updateSentimentById(
      sentimentId,
      sentiment
    );
    res.status(200).json(updatedSentiment);
  } catch (err) {
    next(err);
  }
};

const countSentimentByDate = async (req, res, next) => {
  try {
    const { createdAt } = req.params;
    const countSentiment = await sentimentMeterService.countSentimentByDate(
      createdAt
    );
    res.status(200).json(countSentiment);
  } catch (err) {
    next(err);
  }
};
const getAllSentiment = async (req, res, next) => {
  try {
    const allSentiment = await sentimentMeterService.getAllSentiment();
    res.status(200).json(allSentiment);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createSentiment,
  detailSentiment,
  updateSentiment,
  countSentimentByDate,
  getAllSentiment,
};
