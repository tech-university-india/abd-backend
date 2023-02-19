const router=require('express').Router();
const {createSentiment,detailSentiment,updateSentiment,countSentimentByDate,getAllSentiment}=require('../../../controllers/dsm/sentimentMeter.controller');
router.post('/', createSentiment);
router.get('/',getAllSentiment);
router.get('/date/:createdAt',countSentimentByDate);
router.get('/:id',detailSentiment);
router.patch('/:id',updateSentiment);
module.exports = router;