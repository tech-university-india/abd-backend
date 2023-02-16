const getRandomNumber = (min, max) => {
  return parseInt(Math.floor(Math.random() * (max - min + 1)) + min);
};

module.exports = {
  getRandomNumber,
};