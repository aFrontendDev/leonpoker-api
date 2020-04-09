const { hasRoyalFlush } = require('../functions/pokerHands');

const royalFlushA = ['h2', 'c10', 'c12', 'd5', 'c14', 'c13', 'c11'];

const notRoyalFlushA = ['h2', 'h3', 'h4', 'h5', 'd7', 'c2'];
const notRoyalFlushB = ['2', 'hearts', 1, 123, null, {}];
const notRoyalFlushC = [];
const notRoyalFlushD = null;
const notRoyalFlushE = 'not an array';
const notRoyalFlushF = ['h2', 'h10', 'h7', 'c5', 'h9', 'h8', 'h6'];

test('recognises royal flush A', () => {
  expect(hasRoyalFlush(royalFlushA)).toBe(true);
});

test('recognises not royal flush A', () => {
  expect(hasRoyalFlush(notRoyalFlushA)).toBe(false);
});

test('recognises not royal flush B', () => {
  expect(hasRoyalFlush(notRoyalFlushB)).toBe(false);
});

test('recognises not royal flush C', () => {
  expect(hasRoyalFlush(notRoyalFlushC)).toBe(false);
});

test('recognises not royal flush D', () => {
  expect(hasRoyalFlush(notRoyalFlushD)).toBe(false);
});

test('recognises not royal flush E', () => {
  expect(hasRoyalFlush(notRoyalFlushE)).toBe(false);
});

test('recognises not royal flush F', () => {
  expect(hasRoyalFlush(notRoyalFlushF)).toBe(false);
});
