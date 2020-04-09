const { getMatchingCardRanks } = require('../functions/pokerHands');

const cardsA = ['h2', 'c10', 'c12', 'd5', 'c14', 'c13', 'c11']; // no matches
const cardsB = ['h2', 'c2', 'c12', 'd2', 'c14', 's2', 'c11']; // 4 same
const cardsC = ['h3', 'c2', 'c12', 'd2', 'c14', 's2', 'c11']; // 3 same
const cardsD = ['h3', 'c5', 'c12', 'd2', 'c14', 's2', 'c11']; // 2 same
const cardsE = ['h2', 'c2', 'c12', 'd4', 'c14', 's4', 'c11']; // 2 pairs
const cardsF = ['h2', 'c2', 'c14', 'd5', 's14', 's5', 'c11']; // 3 pairs
const cardsG = ['h2', 'c2', 'c12', 'd2', 'c12', 's4', 's12']; // 2 triples
const cardsH = ['h2', 'c2', 's14', 'd2', 'c14', 's4', 'c11']; // a pair and triple
const cardsI = ['h2', 'c2', 's14', 'd2', 'c14', 's2', 'c11']; // a 4 and a pair

const resultA = {
  2: ['h2'],
  10: ['c10'],
  12: ['c12'],
  5: ['d5'],
  14: ['c14'],
  13: ['c13'],
  11: ['c11']
};

const resultB = {
  2: ['h2', 'c2', 'd2', 's2'],
  12: ['c12'],
  14: ['c14'],
  11: ['c11']
};

const resultC = {
  3: ['h3'],
  2: ['c2', 'd2', 's2'],
  12: ['c12'],
  14: ['c14'],
  11: ['c11']
};

const resultD = {
  3: ['h3'],
  5: ['c5'],
  2: ['d2', 's2'],
  12: ['c12'],
  14: ['c14'],
  11: ['c11']
};

const resultE = {
  2: [ 'h2', 'c2' ],
  4: [ 'd4', 's4' ],
  11: [ 'c11' ],
  12: [ 'c12' ],
  14: [ 'c14' ]
};

const resultF = {
  2: [ 'h2', 'c2' ],
  5: [ 'd5', 's5' ],
  11: [ 'c11' ],
  14: [ 'c14', 's14' ]
};

const resultG = {
  2: [ 'h2', 'c2', 'd2' ],
  4: [ 's4' ],
  12: [ 'c12', 'c12', 's12' ]
};

const resultH = {
  2: [ 'h2', 'c2', 'd2' ],
  4: [ 's4' ],
  11: [ 'c11' ],
  14: [ 's14', 'c14' ]
};

const resultI =  {
  2: [ 'h2', 'c2', 'd2', 's2' ],
  11: [ 'c11' ],
  14: [ 's14', 'c14' ]
};

test('sorts cards A', () => {
  expect(getMatchingCardRanks(cardsA)).toEqual(resultA);
});

test('sorts cards B', () => {
  expect(getMatchingCardRanks(cardsB)).toEqual(resultB);
});

test('sorts cards C', () => {
  expect(getMatchingCardRanks(cardsC)).toEqual(resultC);
});

test('sorts cards D', () => {
  expect(getMatchingCardRanks(cardsD)).toMatchObject(resultD);
});


test('sorts cards E', () => {
  expect(getMatchingCardRanks(cardsE)).toEqual(resultE);
});


test('sorts cards F', () => {
  expect(getMatchingCardRanks(cardsF)).toEqual(resultF);
});


test('sorts cards G', () => {
  expect(getMatchingCardRanks(cardsG)).toEqual(resultG);
});


test('sorts cards H', () => {
  expect(getMatchingCardRanks(cardsH)).toEqual(resultH);
});


test('sorts cards I', () => {
  expect(getMatchingCardRanks(cardsI)).toEqual(resultI);
});
