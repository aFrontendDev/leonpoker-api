const { getMatchingRankHands } = require('../functions/pokerHands');

// No matches
const cardsA = {
  2: ['h2'],
  10: ['c10'],
  12: ['c12'],
  5: ['d5'],
  14: ['c14'],
  13: ['c13'],
  11: ['c11']
};

// 4 same
const cardsB = {
  2: ['h2', 'c2', 'd2', 's2'],
  12: ['c12'],
  14: ['c14'],
  11: ['c11']
};

// 3 same
const cardsC = {
  3: ['h3'],
  2: ['c2', 'd2', 's2'],
  12: ['c12'],
  14: ['c14'],
  11: ['c11']
};

// 2 same
const cardsD = {
  3: ['h3'],
  5: ['c5'],
  2: ['d2', 's2'],
  12: ['c12'],
  14: ['c14'],
  11: ['c11']
};

// 2 pairs
const cardsE = {
  2: [ 'h2', 'c2' ],
  4: [ 'd4', 's4' ],
  11: [ 'c11' ],
  12: [ 'c12' ],
  14: [ 'c14' ]
};

// 3 pairs
const cardsF = {
  2: [ 'h2', 'c2' ],
  5: [ 'd5', 's5' ],
  11: [ 'c11' ],
  14: [ 'c14', 's14' ]
};

// 2 triples
const cardsG = {
  2: [ 'h2', 'c2', 'd2' ],
  4: [ 's4' ],
  12: [ 'c12', 'c12', 's12' ]
};

// a pair and triple
const cardsH = {
  2: [ 'h2', 'c2', 'd2' ],
  4: [ 's4' ],
  11: [ 'c11' ],
  14: [ 's14', 'c14' ]
};

// a 4 and a pair
const cardsI =  {
  2: [ 'h2', 'c2', 'd2', 's2' ],
  11: [ 'c11' ],
  14: [ 's14', 'c14' ]
};

const resultA = {"four":[],"triple":[],"pair":[]};
const resultB = {"four":[{"cards":["h2","c2","d2","s2"],"value": 2}],"triple":[],"pair":[]};
const resultC = {"four":[],"triple":[{"cards":["c2","d2","s2"],"value": 2}],"pair":[]};
const resultD = {"four":[],"triple":[],"pair":[{"cards":["d2","s2"],"value": 2}]};
const resultE = {"four":[],"triple":[],"pair":[{"cards":["h2","c2"],"value": 2},{"cards":["d4","s4"],"value": 4}]};
const resultF = {"four":[],"triple":[],"pair":[{"cards":["h2","c2"],"value": 2},{"cards":["d5","s5"],"value": 5},{"cards":["c14","s14"],"value": 14}]};
const resultG = {"four":[],"triple":[{"cards":["h2","c2","d2"],"value": 2},{"cards":["c12","c12","s12"],"value": 12}],"pair":[]};
const resultH = {"four":[],"triple":[{"cards":["h2","c2","d2"],"value": 2}],"pair":[{"cards":["s14","c14"],"value": 14}]};
const resultI = {"four":[{"cards":["h2","c2","d2","s2"],"value": 2}],"triple":[],"pair":[{"cards":["s14","c14"],"value": 14}]};

test('get matching hands A', () => {
  expect(getMatchingRankHands(cardsA)).toEqual(resultA);
});

test('get matching hands B', () => {
  expect(getMatchingRankHands(cardsB)).toEqual(resultB);
});

test('get matching hands C', () => {
  expect(getMatchingRankHands(cardsC)).toEqual(resultC);
});

test('get matching hands D', () => {
  expect(getMatchingRankHands(cardsD)).toMatchObject(resultD);
});


test('get matching hands E', () => {
  expect(getMatchingRankHands(cardsE)).toEqual(resultE);
});


test('get matching hands F', () => {
  expect(getMatchingRankHands(cardsF)).toEqual(resultF);
});


test('get matching handss G', () => {
  expect(getMatchingRankHands(cardsG)).toEqual(resultG);
});


test('get matching hands H', () => {
  expect(getMatchingRankHands(cardsH)).toEqual(resultH);
});


test('get matching hands I', () => {
  expect(getMatchingRankHands(cardsI)).toEqual(resultI);
});
