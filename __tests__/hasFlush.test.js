const { hasFlush } = require('../functions/scoreHands');

const flushA = ['h2', 'h3', 'h4', 'h5', 'h6', 'c2', 'c3'];
const flushB = ['d2', 'd3', 'd4', 'd5', 'd6', 'c2', 'c3'];
const flushC = ['c2', 'c3', 'c4', 'c5', 'c6'];
const flushD = ['s2', 's3', 's4', 's5', 's6', 'c2', 'c3'];
const flushE = ['h2', 'h3', 'c4', 's5', 'h6', 'h8', 'h11'];

const notFlushA = ['h2', 'h3', 'h4', 'h5', 'd6', 'c2', 'c3'];
const notFlushB = ['d2', 'd3', 'h4', 'h5', 'd6', 'c2', 'c3'];
const notFlushC = ['h2'];
const notFlushD = ['2', '3', '4', '5', '6', '2', '3'];

test('recognises flush A', () => {
  expect(hasFlush(flushA)).toBe(true);
});

test('recognises flush B', () => {
  expect(hasFlush(flushB)).toBe(true);
});

test('recognises flush C', () => {
  expect(hasFlush(flushC)).toBe(true);
});

test('recognises flush D', () => {
  expect(hasFlush(flushD)).toBe(true);
});

test('recognises flush E', () => {
  expect(hasFlush(flushE)).toBe(true);
});

test('recognises not flush A', () => {
  expect(hasFlush(notFlushA)).toBe(false);
});

test('recognises not flush B', () => {
  expect(hasFlush(notFlushB)).toBe(false);
});

test('recognises not flush C', () => {
  expect(hasFlush(notFlushC)).toBe(false);
});

test('recognises not flush D', () => {
  expect(hasFlush(notFlushD)).toBe(false);
});
