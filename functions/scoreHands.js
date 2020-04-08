
const hasFlush = cards => {
  if (!cards || typeof cards === 'undefined' || !Array.isArray(cards)) {
    return false;
  }

  const suits = [];
  cards.forEach(card => {
    const suit = card.substr(0, 1);
    suits.push(suit);
  });

  const heartsFlush = suits.filter((x) => x === 'h').length === 5;
  const clubsFlush = suits.filter((x) => x === 'c').length === 5;
  const spadesFlush = suits.filter((x) => x === 's').length === 5;
  const diamondsFlush = suits.filter((x) => x === 'd').length === 5;

  if (heartsFlush || clubsFlush || spadesFlush || diamondsFlush) {
    return true;
  }

  return false;
};

const convertToNumbers = cards => {
  if (!cards || typeof cards === 'undefined' || !Array.isArray(cards)) {
    return null;
  }

  return cards.map(card => {
    if (!card || typeof card !== 'string' || card.length < 2) {
      return 0;
    }

    let num = card.substr(1, card.length);
    num = parseInt(num, 10);
    num = isNaN(num) ? 0 : num;
    return num;
  });
}

const hasStraight = cards => {
  if (!cards || typeof cards === 'undefined' || !Array.isArray(cards) || cards.length < 1) {
    return false;
  }

  let cardNums = convertToNumbers(cards);
  // put in order
  cardNums = cardNums.sort();
  // remove dups
  cardNums = new Set(cardNums);
  let next = 0;
  let seqLength = 0;

  cardNums.forEach(num => {
    if (seqLength === 5) {
      return;
    }

    if (seqLength > 0) {
      if (num === next) {
        seqLength++;
      } else {
        seqLength = 1;
      }

      next = num + 1;
      return;
    }

    seqLength++;
    next = num + 1;
  });

  return seqLength === 5;
};

module.exports = {
  hasFlush,
  hasStraight,
};
