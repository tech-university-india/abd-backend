const { HttpError } = require('../../errors');
const prisma = require('../../prismaClient');

const selectOnlyValidSentimentMeterFields = {
  select: {
    sentimentId: true,
    author: true,
    sentiment: true,
    createdAt: true,
  },
};
const createSentiment = async (author, sentiment) => {
  const newSentiment = await prisma.sentimentMeter.create({
    data: {
      author,
      sentiment,
    },
    ...selectOnlyValidSentimentMeterFields,
  });
  return newSentiment;
};

const getSentimentById = async (sentimentId) => {
  const sentiment = await prisma.sentimentMeter.findUnique({
    where: {
      sentimentId,
    },
    ...selectOnlyValidSentimentMeterFields,
  });
  if (!sentiment) {
    throw new HttpError(404, `Sentiment with id ${sentimentId} not found`);
  }
  return sentiment;
};

const updateSentimentById = async (sentimentId, sentiment) => {
  const updatedSentiment = await prisma.sentimentMeter.update({
    where: {
      sentimentId,
    },
    data: {
      sentiment,
    },
    ...selectOnlyValidSentimentMeterFields,
  });
  if (updatedSentiment.count === 0) throw new HttpError(404, 'No Record Found');
  return updatedSentiment;
};

const countSentimentByDate = async (createdAt) => {
  const countSentiment = await prisma.sentimentMeter.groupBy({
    by: ['sentiment'],
    where: {
      createdAt: {
        gte: new Date(createdAt),
        lte: new Date(
          new Date(createdAt).setDate(new Date(createdAt).getDate() + 1)
        ),
      },
    },
    _count: {
      sentiment: true,
    },
  });

  if (countSentiment.length === 0)
    throw new HttpError(404, 'No Data found for the date' + createdAt);

  const fullCount = countSentiment.reduce((acc, curr) => {
    acc += curr._count.sentiment;
    return acc;
  }, 0);

  countSentiment.forEach((element) => {
    element.percentage = (element._count.sentiment / fullCount) * 100;
    delete element._count;
  });
  return countSentiment;
};

const getAllSentiment = async () => {
  const allSentiment = await prisma.sentimentMeter.findMany({
    ...selectOnlyValidSentimentMeterFields,
  });
  return allSentiment;
};

const deleteSentimentById = async (sentimentId) => {
  const deletedSentiment = await prisma.sentimentMeter.delete({
    where: {
      sentimentId,
    },
  });
  if (deletedSentiment.count === 0) throw new HttpError(404, 'No Record Found');
};

module.exports = {
  createSentiment,
  getSentimentById,
  updateSentimentById,
  countSentimentByDate,
  getAllSentiment,
  deleteSentimentById
};
