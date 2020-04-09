const { cardsAsExpected, cardAsExpected, convertCardToNumber, sortObject, convertToNumbers, forceArray } = require('../helpers/dataHelpers');
const {
  hasFlush,
  hasStraight,
  hasStraightFlush,
  hasRoyalFlush,
  getMatchingCardRanks,
  getMatchingRankHands,
  getMatchingHands,
} = require('./pokerHands');

const getHighestCard = rankedCards => {
  if (!rankedCards || typeof rankedCards !== 'object') {
    return 0;
  }

  const ranks = Object.keys(rankedCards);
  if (!ranks || ranks.length < 1) {
    return 0;
  }

  const ranksDesc = ranks.sort((a, b) => b - a);
  const topRank = ranksDesc[0];
  return typeof topRank === 'number' ? topRank : parseInt(topRank, 10);
};

const calculateCardTotal = cards => {
  if (!cardsAsExpected(cards)) {
    return null;
  }

  const cardNumbers = convertToNumbers(cards);
  if (!cardsAsExpected(cardNumbers)) {
    return null;
  }

  return cardNumbers.reduce((total, number) => {
    return total + number;
  }, 0);
}

const getTopRankedhands = rankHands => {
  const handsArr = forceArray(rankHands);
  if (!handsArr || handsArr.length < 1) {
    return null;
  }

  const handsDesc = handsArr.sort((a, b) => b.value - a.value);
  if (handsDesc.length < 2) {
    return handsDesc;
  }

  return [handsDesc[0], handsDesc[1]];
}

const getBestHand = cards => {
  if (!cardsAsExpected(cards)) {
    return null;
  }
  let score = 0;
  let total = 0;
  let switchCards = null;

  const royalFlush = hasRoyalFlush(cards);
  const straightFlush = hasStraightFlush(cards);
  const { isStraightFlush, cards: straightFlushCards } = straightFlush || {};
  const flush = hasFlush(cards);
  const { isFlush, cards: flushCards } = flush || {};
  const straight = hasStraight(cards);
  const { isStraight, cards: straightCards } = straight || {};
  const cardsByRank = getMatchingCardRanks(cards);
  const matchingRankHands = getMatchingRankHands(cardsByRank);
  const { four, triple, pair } = matchingRankHands || {};
  const matchingHands = getMatchingHands(matchingRankHands);
  const {
    hasFourOfAKind,
    hasThreeOfAKind,
    hasTwoPair,
    hasPair,
    hasFullHouse
  } = matchingHands || {};
  const highestCard = getHighestCard(cardsByRank);

  const topHand = {
    royalFlush: false,
    straightFlush: false,
    fourOfAKind: false,
    fullHouse: false,
    flush: false,
    straight: false,
    threeOfAKind: false,
    twoPair: false,
    pair: false,
    highestCard,
  };

  switch(true) {
    case royalFlush:
      score = 1000;
      topHand.royalFlush = true;
      break;
    case isStraightFlush:
      total = calculateCardTotal(straightFlushCards);
      score = 380 + total;
      topHand.straightFlush = true;
      break;
    case hasFourOfAKind:
      switchCards = getTopRankedhands(four);
      total = calculateCardTotal(cards);
      score = 324 + total;
      topHand.fourOfAKind = true;
      break;
    case hasFullHouse:
      const cardsTriple = getTopRankedhands(triple);
      const cardsPairs = getTopRankedhands(pair);
      const tripleTotal = calculateCardTotal(cardsTriple[0].cards);
      const pairTotal = calculateCardTotal(cardsPairs[0].cards);
      total = tripleTotal + pairTotal;
      score = 256  + total;
      topHand.fullHouse = true;
      break;
    case isFlush:
      total = calculateCardTotal(flushCards);
      score = 196 + total;
      topHand.flush = true;
      break;
    case isStraight:
      total = straightCards.reduce((totalSum, number) => {
        return totalSum + number;
      }, 0);
      score = 136 + total;
      topHand.straight = true;
      break;
    case hasThreeOfAKind:
      switchCards = getTopRankedhands(triple);
      total = calculateCardTotal(switchCards[0].cards);
      score = 94 + total;
      topHand.threeOfAKind = true;
      break;
    case hasTwoPair:
      switchCards = getTopRankedhands(pair);
      const totalA = calculateCardTotal(switchCards[0].cards);
      const totalB = calculateCardTotal(switchCards[1].cards);
      total = totalA + totalB;
      score = 42 + total;
      topHand.twoPair = true;
      break;
    case hasPair:
      switchCards = getTopRankedhands(pair);
      total = calculateCardTotal(switchCards[0].cards);
      score = 14 + total;
      topHand.pair = true;
      break;

    default:
      score = highestCard;
      break;
  };

  return {
    score,
    topHand,
    highestCard
  };
}

module.exports = {
  getBestHand,
};
