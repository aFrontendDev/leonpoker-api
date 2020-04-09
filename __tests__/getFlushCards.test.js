const { getFlushCards } = require('../functions/pokerHands');

const FlushA = ['h2', 'c10', 'c12', 'd5', 'c14', 'c13', 'c11'];

const notFlushA = ['h2', 'h3', 'h4', 'h5', 'd7', 'c2'];
const notFlushB = ['2', 'hearts', 1, 123, null, {}];
const notFlushC = [];
const notFlushD = null;
const notFlushE = 'not an array';

const resultA = ["c10", "c12", "c14", "c13", "c11"];

test('returns flush cards', () => {
  expect(getFlushCards(FlushA)).toEqual(resultA);
});

test('returns null for non flush cards', () => {
  expect(getFlushCards(notFlushA)).toEqual(null);
});

test('returns null for array of unexpected types', () => {
  expect(getFlushCards(notFlushB)).toEqual(null);
});

test('returns null for empty array', () => {
  expect(getFlushCards(notFlushC)).toEqual(null);
});

test('returns null for null cards value', () => {
  expect(getFlushCards(notFlushD)).toEqual(null);
});

test('returns null for unexpected cards type', () => {
  expect(getFlushCards(notFlushE)).toEqual(null);
});

