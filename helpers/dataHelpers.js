
const cardsAsExpected = cards => {
  if (!cards || typeof cards === 'undefined' || !Array.isArray(cards) || cards.length < 1) {
    return false;
  }

  return true;
};

const cardAsExpected = card => {
  if (!card || typeof card !== 'string' || card.length < 2) {
    return false;
  }

  return true;
};

const convertCardToNumber = card => {
  if (!card || typeof card !== 'string' || card.length < 2) {
    return 0;
  }

  let num = card.substr(1, card.length);
  num = parseInt(num, 10);
  num = isNaN(num) ? 0 : num;
  return num;
};

const sortObject = object => {
  if (!object || typeof object !== 'object') {
    return null;
  }

  const keys = Object.keys(object);
  if (!keys || keys.length < 1) {
    return null;
  }

  const sortedKeys = keys.sort((a, b) => {
    return a - b;
  });

  const sortedObject = {};
  sortedKeys.forEach(key => {
    sortedObject[key] = object[key];
  });

  return sortedObject;
};

const convertToNumbers = cards => {
  if (!cardsAsExpected(cards)) {
    return null;
  }

  return cards.map(card => {
    if (!cardAsExpected(card)) {
      return 0;
    }

    return convertCardToNumber(card);
  });
};

const forceArray = data => {
  if (!data || typeof data === 'undefined') {
    return [];
  }

  const dataIsArray = Array.isArray(data);
  return dataIsArray ? data : [data];
};

module.exports = {
  convertToNumbers,
  sortObject,
  convertCardToNumber,
  cardAsExpected,
  cardsAsExpected,
  forceArray
};
