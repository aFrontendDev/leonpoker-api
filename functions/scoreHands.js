
const hasFlush = cards => {
  if (!cards || typeof cards === 'undefined' || !Array.isArray(cards)) {
    return false;
  }

  const suits = [];
  cards.forEach(card => {
    if (!card || typeof card !== 'string' || card.length < 2) {
      return;
    }

    const suit = card.substr(0, 1);
    suits.push(suit);
  });

  const heartsFlush = suits.filter(x => x === 'h').length >= 5;
  const clubsFlush = suits.filter(x => x === 'c').length >= 5;
  const spadesFlush = suits.filter(x => x === 's').length >= 5;
  const diamondsFlush = suits.filter(x => x === 'd').length >= 5;

  if (heartsFlush || clubsFlush || spadesFlush || diamondsFlush) {
    return true;
  }

  return false;
};

const getCardsBySuit = cards => {
  if (!cards || typeof cards === 'undefined' || !Array.isArray(cards) || cards.length < 1) {
    return null;
  }

  return cards.reduce((cardsBySuit, card) => {
    if (!card || typeof card !== 'string' || card.length < 2) {
      return cardsBySuit;
    }

    const suit = card.substr(0,1);

    if (cardsBySuit.hasOwnProperty(suit)) {
      cardsBySuit[suit].push(card);
    } else {
      cardsBySuit[suit] = [card];
    }

    return cardsBySuit;
  }, {});
}

const convertToNumbers = cards => {
  if (!cards || typeof cards === 'undefined' || !Array.isArray(cards) || cards.length < 1) {
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
  cardNums = cardNums.sort((a, b) => {
    return a - b;
  });
  // remove dups
  cardNums = new Set(cardNums);
  let next = 0;
  let seqLength = 0;

  cardNums.forEach(num => {
    if (seqLength >= 5) {
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

  return seqLength >= 5;
};

const hasRoyalStraight = cards => {
  if (!cards || typeof cards === 'undefined' || !Array.isArray(cards) || cards.length < 1) {
    return false;
  }

  let cardNums = convertToNumbers(cards);
  // put in order
  cardNums = cardNums.sort((a, b) => {
    return a - b;
  });
  // remove dups
  cardNums = new Set(cardNums);

  // simple checks for presence of 10, 11, 12, 13, 14 (10, jack, queen, king, ace)
  const hasAce = cardNums.has(14);
  const hasKing = cardNums.has(13);
  const hasQueen = cardNums.has(12);
  const hasJack = cardNums.has(11);
  const hasTen = cardNums.has(10);

  return hasAce && hasKing && hasQueen && hasJack && hasTen;
}

const getFlushCards = cards => {
  if (!cards || typeof cards === 'undefined' || !Array.isArray(cards) || cards.length < 1) {
    return null;
  }

  const cardsBySuit = getCardsBySuit(cards);
  if (!cardsBySuit) {
    return null;
  }

  const suits = Object.keys(cardsBySuit);
  return suits.reduce((flush, suit) => {
    if (cardsBySuit[suit].length >= 5) {
      flush = cardsBySuit[suit];
    }

    return flush;
  }, null);
}

const hasStraightFlush = cards => {
  if (!cards || typeof cards === 'undefined' || !Array.isArray(cards)) {
    return false;
  }

  const containsFlush = hasFlush(cards);
  if (!containsFlush) {
    return false;
  }

  const cardsInFlush = getFlushCards(cards);
  if (!cardsInFlush) {
    return false;
  }

  return hasStraight(cardsInFlush);
}

const hasRoyalFlush = cards => {
  if (!cards || typeof cards === 'undefined' || !Array.isArray(cards)) {
    return false;
  }

  const containsFlush = hasFlush(cards);
  if (!containsFlush) {
    return false;
  }

  const cardsInFlush = getFlushCards(cards);
  if (!cardsInFlush) {
    return false;
  }

  return hasRoyalStraight(cardsInFlush);
}

module.exports = {
  hasFlush,
  hasStraight,
  hasStraightFlush,
  getCardsBySuit,
  hasRoyalStraight,
  hasRoyalFlush,
  convertToNumbers,
  getFlushCards
};
