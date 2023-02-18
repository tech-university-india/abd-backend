const { HttpError } = require('../../errors');
const prisma = require('../../prismaClient');

const selectOnlyValidCelebrationBoardFields = {
  select: {
    celebrationId: true,
    author: true,
    content: true,
    type: true,
    createdAt: true,
  }
};

// get list of all celebrations
const listCelebrations = async () => {
  const celebrations = await prisma.Celebration.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    ...selectOnlyValidCelebrationBoardFields
  }
  );
  return celebrations;
};

// get a celebration by id
const getCelebrationById = async (celebrationId) => {
  const celebration = await prisma.Celebration.findUnique({
    where: {
      celebrationId
    },
    ...selectOnlyValidCelebrationBoardFields
  }
  );
  if (!celebration) throw new HttpError(404, 'No Record Found');
  return celebration;
};

// create a new celebration
const createCelebration = async (author, content, type) => {
  const newCelebration = await prisma.Celebration.create({
    data: {
      author,
      content,
      type,
    },
    ...selectOnlyValidCelebrationBoardFields
  }
  );
  return newCelebration;
};

// update a celebration
const updateCelebrationById = async (celebrationId, content, type) => {
  const updatedCelebration = await prisma.Celebration.update({
    where: {
      celebrationId
    },
    data: {
      content,
      type,
    },
    ...selectOnlyValidCelebrationBoardFields
  }
  );
  if (updateCelebrationById.count === 0) throw new HttpError(404, 'No Record Found');
  return updatedCelebration;
};

// delete a celebration
const deleteCelebrationById = async (celebrationId) => {
  const deletedCelebration = await prisma.Celebration.delete({
    where: {
      celebrationId
    },
    ...selectOnlyValidCelebrationBoardFields
  }
  );
  if (deletedCelebration.count === 0) throw new HttpError(404, 'No Record Found');
  return deletedCelebration;
};

module.exports = {
  listCelebrations,
  getCelebrationById,
  createCelebration,
  updateCelebrationById,
  deleteCelebrationById,
};