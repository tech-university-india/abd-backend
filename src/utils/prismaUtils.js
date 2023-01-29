const getPaginationObject = (query) => {

  const page = query?.page || 1;
  const limit = query?.limit || 5;

  return {
    skip: (page - 1) * limit,
    take: limit * 1
  };
};

const validateDateFormat = (date) => {
  const dateValidate = /\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/g; //eslint-disable-line
  return dateValidate.exec(date) !== null ? true : false;
};

const formatToDate = (dateQuery) => {
  return dateQuery ? dateQuery.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3') : undefined;
};

const filterToDifferentTypes = (noteItems) => {
  const filteredNotes = {};
  noteItems.forEach(noteItem => {
    filteredNotes[noteItem.type] ?
      filteredNotes[noteItem.type].push(noteItem) :
      filteredNotes[noteItem.type] = [noteItem];
  });
  return filteredNotes;
};

const statusEnum = {
  COMPLETED: 'COMPLETED',
  PENDING: 'PENDING',
  NONE: 'NONE'
};

const typeEnum = {
  ACTION_ITEM: 'ACTION_ITEM',
  KEY_DECISION: 'KEY_DECISION',
  AGEND_ITEM: 'AGEND_ITEM'
};

const getValidStatusEnum = (status) => {
  return status ? statusEnum[status.toUpperCase()] : null;
};

const getValidTypeEnum = (type) => {
  return type ? typeEnum[type.toUpperCase()] : null;
};

module.exports = {
  getPaginationObject,
  formatToDate: formatToDate,
  validateDateFormat: validateDateFormat,
  filterToDifferentTypes: filterToDifferentTypes,
  getValidStatusEnum,
  getValidTypeEnum
};
