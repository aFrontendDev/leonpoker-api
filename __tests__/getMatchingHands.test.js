const { getMatchingHands } = require('../functions/pokerHands');

// No matches
const cardsA = {"four":[],"triple":[],"pair":[]};

// 4 same
const cardsB = {"four":[{"cards":["h2","c2","d2","s2"],"value": 2}],"triple":[],"pair":[]};

// 3 same
const cardsC = {"four":[],"triple":[{"cards":["c2","d2","s2"],"value": 2}],"pair":[]};

// 2 same
const cardsD = {"four":[],"triple":[],"pair":[{"cards":["d2","s2"],"value": 2}]};

// 2 pairs
const cardsE = {"four":[],"triple":[],"pair":[{"cards":["h2","c2"],"value": 2},{"cards":["d4","s4"],"value": 4}]};

// 3 pairs
const cardsF = {"four":[],"triple":[],"pair":[{"cards":["h2","c2"],"value": 2},{"cards":["d5","s5"],"value": 5},{"cards":["c14","s14"],"value": 14}]};

// 2 triples
const cardsG = {"four":[],"triple":[{"cards":["h2","c2","d2"],"value": 2},{"cards":["c12","c12","s12"],"value": 12}],"pair":[]};

// a pair and triple
const cardsH = {"four":[],"triple":[{"cards":["h2","c2","d2"],"value": 2}],"pair":[{"cards":["s14","c14"],"value": 14}]};

// a 4 and a pair
const cardsI = {"four":[{"cards":["h2","c2","d2","s2"],"value": 2}],"triple":[],"pair":[{"cards":["s14","c14"],"value": 14}]};

const resultA = {
  hasFourOfAKind: false,
  hasThreeOfAKind: false,
  hasTwoPair: false,
  hasPair: false,
  hasFullHouse: false
};

const resultB = {
  hasFourOfAKind: true,
  hasThreeOfAKind: false,
  hasTwoPair: false,
  hasPair: false,
  hasFullHouse: false
};

const resultC = {
  hasFourOfAKind: false,
  hasThreeOfAKind: true,
  hasTwoPair: false,
  hasPair: false,
  hasFullHouse: false
};

const resultD = {
  hasFourOfAKind: false,
  hasThreeOfAKind: false,
  hasTwoPair: false,
  hasPair: true,
  hasFullHouse: false
};

const resultE = {
  hasFourOfAKind: false,
  hasThreeOfAKind: false,
  hasTwoPair: true,
  hasPair: true,
  hasFullHouse: false
};

const resultF = {
  hasFourOfAKind: false,
  hasThreeOfAKind: false,
  hasTwoPair: true,
  hasPair: true,
  hasFullHouse: false
};

const resultG = {
  hasFourOfAKind: false,
  hasThreeOfAKind: true,
  hasTwoPair: false,
  hasPair: false,
  hasFullHouse: false
};

const resultH = {
  hasFourOfAKind: false,
  hasThreeOfAKind: true,
  hasTwoPair: false,
  hasPair: true,
  hasFullHouse: true
};

const resultI = {
  hasFourOfAKind: true,
  hasThreeOfAKind: false,
  hasTwoPair: false,
  hasPair: true,
  hasFullHouse: false
};


test('get matching hands A', () => {
  expect(getMatchingHands(cardsA)).toEqual(resultA);
});

test('get matching hands B', () => {
  expect(getMatchingHands(cardsB)).toEqual(resultB);
});

test('get matching hands C', () => {
  expect(getMatchingHands(cardsC)).toEqual(resultC);
});

test('get matching hands D', () => {
  expect(getMatchingHands(cardsD)).toMatchObject(resultD);
});


test('get matching hands E', () => {
  expect(getMatchingHands(cardsE)).toEqual(resultE);
});


test('get matching hands F', () => {
  expect(getMatchingHands(cardsF)).toEqual(resultF);
});


test('get matching handss G', () => {
  expect(getMatchingHands(cardsG)).toEqual(resultG);
});


test('get matching hands H', () => {
  expect(getMatchingHands(cardsH)).toEqual(resultH);
});


test('get matching hands I', () => {
  expect(getMatchingHands(cardsI)).toEqual(resultI);
});
