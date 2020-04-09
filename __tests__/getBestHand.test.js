const { getBestHand } = require('../functions/scoreHands');


const cardsA = ['h2', 'c10', 'c12', 'd5', 'c14', 'c13', 'c11']; // royal flush
const cardsB = ['h2', 'h3', 'h4', 'h5', 'h6', 'c13', 'c11']; // straight flush
const cardsC = ['h2', 'c2', 'd2', 's2', 'h6', 'c13', 'c11']; // 4 of a kind
const cardsD = ['h2', 'c2', 'd2', 's3', 'h3', 'c14', 'd14']; // full house
const cardsE = ['h2', 'h4', 'h6', 'h7', 'h8', 'c14', 'd14']; // flush
const cardsF = ['h2', 'h3', 'h4', 'c5', 'd6', 'c14', 'd14']; // straight
const cardsG = ['h2', 'd2', 'c2', 'c5', 'd6', 'c11', 'd14']; // 3 of a kind
const cardsH = ['h2', 'd2', 'c4', 's4', 'd6', 'c11', 'd14']; // 2 pair
const cardsI = ['h2', 'd2', 'c4', 's8', 'd6', 'c11', 'd14']; // pair
const cardsJ = ['h2', 'd10', 'c4', 's8', 'd6', 'c11', 'd14']; // nothing

test('recognise royal flush', () => {
  expect(getBestHand(cardsA)).toEqual({
    score: 1000,
    highestCard: 14,
    topHand: {
      royalFlush: true,
      straightFlush: false,
      fourOfAKind: false,
      fullHouse: false,
      flush: false,
      straight: false,
      threeOfAKind: false,
      twoPair: false,
      pair: false,
      highestCard: 14,
    },
  });
});

test('recognise straight flush', () => {
  expect(getBestHand(cardsB)).toEqual({
    score: 400,
    highestCard: 13,
    topHand: {
      royalFlush: false,
      straightFlush: true,
      fourOfAKind: false,
      fullHouse: false,
      flush: false,
      straight: false,
      threeOfAKind: false,
      twoPair: false,
      pair: false,
      highestCard: 13,
    },
  });
});

test('recognise four of a kind', () => {
  expect(getBestHand(cardsC)).toEqual({
    score: 362,
    highestCard: 13,
    topHand: {
      royalFlush: false,
      straightFlush: false,
      fourOfAKind: true,
      fullHouse: false,
      flush: false,
      straight: false,
      threeOfAKind: false,
      twoPair: false,
      pair: false,
      highestCard: 13,
    },
  });
});

test('recognise full house', () => {
  expect(getBestHand(cardsD)).toEqual({
    score: 290,
    highestCard: 14,
    topHand: {
      royalFlush: false,
      straightFlush: false,
      fourOfAKind: false,
      fullHouse: true,
      flush: false,
      straight: false,
      threeOfAKind: false,
      twoPair: false,
      pair: false,
      highestCard: 14,
    },
  });
});

test('recognise flush', () => {
  expect(getBestHand(cardsE)).toEqual({
    score: 223,
    highestCard: 14,
    topHand: {
      royalFlush: false,
      straightFlush: false,
      fourOfAKind: false,
      fullHouse: false,
      flush: true,
      straight: false,
      threeOfAKind: false,
      twoPair: false,
      pair: false,
      highestCard: 14,
    },
  });
});

test('recognise straight', () => {
  expect(getBestHand(cardsF)).toEqual({
    score: 156,
    highestCard: 14,
    topHand: {
      royalFlush: false,
      straightFlush: false,
      fourOfAKind: false,
      fullHouse: false,
      flush: false,
      straight: true,
      threeOfAKind: false,
      twoPair: false,
      pair: false,
      highestCard: 14,
    },
  });
});

test('recognise three of a kind', () => {
  expect(getBestHand(cardsG)).toEqual({
    score: 100,
    highestCard: 14,
    topHand: {
      royalFlush: false,
      straightFlush: false,
      fourOfAKind: false,
      fullHouse: false,
      flush: false,
      straight: false,
      threeOfAKind: true,
      twoPair: false,
      pair: false,
      highestCard: 14,
    },
  });
});

test('recognise two pair', () => {
  expect(getBestHand(cardsH)).toEqual({
    score: 54,
    highestCard: 14,
    topHand: {
      royalFlush: false,
      straightFlush: false,
      fourOfAKind: false,
      fullHouse: false,
      flush: false,
      straight: false,
      threeOfAKind: false,
      twoPair: true,
      pair: false,
      highestCard: 14,
    },
  });
});

test('recognise pair', () => {
  expect(getBestHand(cardsI)).toEqual({
    score: 18,
    highestCard: 14,
    topHand: {
      royalFlush: false,
      straightFlush: false,
      fourOfAKind: false,
      fullHouse: false,
      flush: false,
      straight: false,
      threeOfAKind: false,
      twoPair: false,
      pair: true,
      highestCard: 14,
    },
  });
});

test('recognise high card only', () => {
  expect(getBestHand(cardsJ)).toEqual({
    score: 14,
    highestCard: 14,
    topHand: {
      royalFlush: false,
      straightFlush: false,
      fourOfAKind: false,
      fullHouse: false,
      flush: false,
      straight: false,
      threeOfAKind: false,
      twoPair: false,
      pair: false,
      highestCard: 14,
    },
  });
});