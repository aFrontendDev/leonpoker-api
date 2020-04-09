const { cardsAsExpected, cardAsExpected, convertCardToNumber, sortObject, convertToNumbers } = require('../helpers/dataHelpers');

const hasFlush = cards => {
  if (!cardsAsExpected(cards)) {
    return {
      isFlush: false,
      cards: null
    };
  }

  const suits = [];
  cards.forEach(card => {
    if (!cardAsExpected(card)) {
      return {
        isFlush: false,
        cards: null
      };
    }

    const suit = card.substr(0, 1);
    suits.push(suit);
  });

  const heartsFlush = suits.filter(x => x === 'h').length >= 5;
  const clubsFlush = suits.filter(x => x === 'c').length >= 5;
  const spadesFlush = suits.filter(x => x === 's').length >= 5;
  const diamondsFlush = suits.filter(x => x === 'd').length >= 5;

  if (heartsFlush || clubsFlush || spadesFlush || diamondsFlush) {
    const cardsInFlush = getFlushCards(cards);
    return {
      isFlush: true,
      cards: cardsInFlush
    };
  }

  return {
    isFlush: false,
    cards: null
  };
};

const getCardsBySuit = cards => {
  if (!cardsAsExpected(cards)) {
    return null;
  }

  return cards.reduce((cardsBySuit, card) => {
    if (!cardAsExpected(card)) {
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
};

const hasStraight = cards => {
  if (!cardsAsExpected(cards)) {
    return {
      isStraight: false,
      cards: null
    };
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
  let numArr = [];

  cardNums.forEach(num => {
    if (seqLength >= 5) {
      return;
    }

    if (seqLength > 0) {
      if (num === next) {
        seqLength++;
        numArr.push(num);
      } else {
        seqLength = 1;
        numArr = [num];
      }

      next = num + 1;
      return;
    }

    seqLength++;
    next = num + 1;
    numArr.push(num);
  });

  const isAStraight = seqLength >= 5;
  if (!isAStraight) {
    return {
      isStraight: false,
      cards: null
    };
  }

  return {
    isStraight: true,
    cards: numArr
  };
};

const hasRoyalStraight = cards => {
  if (!cardsAsExpected(cards)) {
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
};

const getFlushCards = cards => {
  if (!cardsAsExpected(cards)) {
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
};

const hasStraightFlush = cards => {
  if (!cardsAsExpected(cards)) {
    return {
      isStraightFlush: false,
      cards: null
    };
  }

  const containsFlush = hasFlush(cards);
  if (!containsFlush) {
    return {
      isStraightFlush: false,
      cards: null
    };
  }

  const cardsInFlush = getFlushCards(cards);
  if (!cardsInFlush) {
    return {
      isStraightFlush: false,
      cards: null
    };
  }

  const isStraightObj = hasStraight(cardsInFlush);
  const { isStraight } = isStraightObj || {};

  return {
    isStraightFlush: isStraight,
    cards: cardsInFlush
  };
};

const hasRoyalFlush = cards => {
  if (!cardsAsExpected(cards)) {
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
};

const getMatchingCardRanks = cards => {
  if (!cardsAsExpected(cards)) {
    return false;
  }

  const cardsByRanks = cards.reduce((cardsByNumbers, card) => {
    if (!cardAsExpected(card)) {
      return matchingCards;
    }

    const cardNum = convertCardToNumber(card);
    if (cardsByNumbers.hasOwnProperty(cardNum)) {
      cardsByNumbers[cardNum].push(card);
    } else {
      cardsByNumbers[cardNum] = [card];
    }

    return cardsByNumbers;
  }, {});

  return sortObject(cardsByRanks);
};

const getMatchingRankHands = cards => {
  if (!cards || typeof cards !== 'object') {
    return {
      four,
      triple,
      pair
    };
  }

  const keys = Object.keys(cards);
  if (keys.length < 1) {
    return {
      four,
      triple,
      pair
    };
  }

  const four = [];
  const triple = [];
  const pair = [];

  for (const property in cards) {
    const cardsMatch = cards[property];
    const count = cardsMatch.length;
    const rank = typeof property === 'number' ? property : parseInt(property, 10);

    if (count === 4) {
      four.push({cards: cardsMatch, value: rank});
    }

    if (count === 3) {
      triple.push({cards: cardsMatch, value: rank});
    }

    if (count === 2) {
      pair.push({cards: cardsMatch, value: rank});
    }
  }

  return {
    four,
    triple,
    pair
  };
};

const getMatchingHands = matchingHands => {
  const { four, triple, pair } = matchingHands || {};

  const hasFourOfAKind = four.length > 0;
  const hasThreeOfAKind = triple.length > 0;
  const hasTwoPair = pair.length > 1;
  const hasPair = pair.length > 0;
  const hasFullHouse = hasThreeOfAKind && hasPair;

  return {
    hasFourOfAKind,
    hasThreeOfAKind,
    hasTwoPair,
    hasPair,
    hasFullHouse
  }
};

module.exports = {
  hasFlush,
  hasStraight,
  hasStraightFlush,
  getCardsBySuit,
  hasRoyalStraight,
  hasRoyalFlush,
  getFlushCards,
  getMatchingCardRanks,
  getMatchingRankHands,
  getMatchingHands,
};
