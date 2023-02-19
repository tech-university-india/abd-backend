const sentimentMeterService = require('../../services/dsm/sentimentMeter.services');
const createSentiment = async (req,res,next) => {
    try {
        const { author, sentiment } = req.body;
        const newSentiment = await sentimentMeterService.createSentiment(author, sentiment);
        res.status(201).json(newSentiment);
    } catch (err) {
       next(err);
    }
    };

const detailSentiment=async(req,res,next)=>{
    try{
        const sentimentMeterId = parseInt(req.params.id);
        const sentiment=await sentimentMeterService.getSentimentById(sentimentMeterId);
        res.status(200).json(sentiment);
    }catch(err){
        next(err);
    }
};

const updateSentiment=async(req,res,next)=>{
    try{
        const sentimentMeterId = parseInt(req.params.id);
        const {sentiment}=req.body;
        const updatedSentiment=await sentimentMeterService.updateSentimentById(sentimentMeterId,sentiment);
        res.status(200).json(updatedSentiment);
    }catch(err){
        next(err);
    }
};

const countSentimentByDate=async(req,res,next)=>{
    try{
        const {createdAt}=req.params;
        const countSentiment=await sentimentMeterService.countSentimentByDate(createdAt);
        console.log(countSentiment);
        res.status(200).json(countSentiment);
    }catch(err){
        next(err);
    }
};
const getAllSentiment=async(req,res,next)=>{
    try{
        const allSentiment=await sentimentMeterService.getAllSentiment();
        res.status(200).json(allSentiment);
    }catch(err){
            next(err);
    }
};

    module.exports = {
          createSentiment,
          detailSentiment,
          updateSentiment,
          countSentimentByDate,
            getAllSentiment
    };