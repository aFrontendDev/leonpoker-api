const { convertToNumbers } = require('../functions/scoreHands');

const cardsA = ['h2', 'h3', 'h4', 'h5', 'h6', 'c2', 'c3'];
const cardsB = ['c5', 'd2', 'd3', 's4', 's5', 'h6', 'c2'];
const cardsC = ['c', '2', 3, null, {}, [], NaN, 's14'];
const cardsD = [];
const cardsE = {};
const cardsF = null;

const resultA = [2, 3, 4, 5, 6, 2, 3];
const resultB = [5, 2, 3, 4, 5, 6, 2];
const resultC = [0, 0, 0, 0, 0, 0, 0, 14];
const resultD = null;

test('Convert to numbers A', () => {
  expect(convertToNumbers(cardsA)).toEqual(resultA);
});

test('Convert to numbers B', () => {
  expect(convertToNumbers(cardsB)).toEqual(resultB);
});

test('Deal with incorrect types', () => {
  expect(convertToNumbers(cardsC)).toEqual(resultC);
});

test('Deal with empty array', () => {
  expect(convertToNumbers(cardsD)).toEqual(resultD);
});

test('Deal with object', () => {
  expect(convertToNumbers(cardsE)).toEqual(resultD);
});

test('Deal with null', () => {
  expect(convertToNumbers(cardsF)).toEqual(resultD);
});