const { hasFlush } = require('../functions/pokerHands');

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
  expect(hasFlush(flushA)).toEqual({
    isFlush: true,
    cards: ["h2", "h3", "h4", "h5", "h6"],
  });
});

test('recognises flush B', () => {
  expect(hasFlush(flushB)).toEqual({
    cards: ["d2", "d3", "d4", "d5", "d6"],
    isFlush: true
  });
});

test('recognises flush C', () => {
  expect(hasFlush(flushC)).toEqual({
    cards: ["c2", "c3", "c4", "c5", "c6"],
    isFlush: true
  });
});

test('recognises flush D', () => {
  expect(hasFlush(flushD)).toEqual({
    cards: ["s2", "s3", "s4", "s5", "s6"],
    isFlush: true
  });
});

test('recognises flush E', () => {
  expect(hasFlush(flushE)).toEqual({
    cards: ["h2", "h3", "h6", "h8", "h11"],
    isFlush: true
  });
});

test('recognises not flush A', () => {
  expect(hasFlush(notFlushA)).toEqual({
    cards: null,
    isFlush: false
  });
});

test('recognises not flush B', () => {
  expect(hasFlush(notFlushB)).toEqual({
    cards: null,
    isFlush: false
  });
});

test('recognises not flush C', () => {
  expect(hasFlush(notFlushC)).toEqual({
    cards: null,
    isFlush: false
  });
});

test('recognises not flush D', () => {
  expect(hasFlush(notFlushD)).toEqual({
    cards: null,
    isFlush: false
  });
});
