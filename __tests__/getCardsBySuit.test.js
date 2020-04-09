const { getCardsBySuit } = require('../functions/pokerHands');

const cardsA = ['h2', 'h3', 'h4', 'h5', 'h6', 'c2', 'c3'];
const cardsB = ['c5', 'd2', 'd3', 's4', 's5', 'h6', 'c2'];

const resultA = {
  h: ['h2', 'h3', 'h4', 'h5', 'h6'],
  c: ['c2', 'c3']
};

const resultB = {
  c: ['c5', 'c2'],
  d: ['d2', 'd3'],
  s: ['s4', 's5'],
  h: ['h6'],
};

test('categorise cards A', () => {
  expect(getCardsBySuit(cardsA)).toEqual(resultA);
});

test('categorise cards B', () => {
  expect(getCardsBySuit(cardsB)).toEqual(resultB);
});
