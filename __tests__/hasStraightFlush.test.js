const { hasStraightFlush } = require('../functions/pokerHands');

const straightFlushA = ['h2', 'h10', 'h7', 'c5', 'h9', 'h8', 'h6'];
const straightFlushB = ['h2', 'c10', 'c12', 'd5', 'c14', 'c13', 'c11'];

const notStraightA = ['h2', 'h3', 'h4', 'h5', 'd7', 'c2'];
const notStraightB = ['2', 'hearts', 1, 123, null, {}];
const notStraightC = [];
const notStraightD = null;
const notStraightE = 'not an array';

test('recognises straight flush A', () => {
  expect(hasStraightFlush(straightFlushA)).toEqual({
    cards: ["h2", "h10", "h7", "h9", "h8", "h6"],
    isStraightFlush: true
  });
});

test('recognises straight flush B', () => {
  expect(hasStraightFlush(straightFlushB)).toEqual({
    cards: ["c10", "c12", "c14", "c13", "c11"],
    isStraightFlush: true
  });
});

test('recognises not straight flush A', () => {
  expect(hasStraightFlush(notStraightA)).toEqual({
    isStraightFlush: false,
    cards: null
  });
});

test('recognises not straight flush B', () => {
  expect(hasStraightFlush(notStraightB)).toEqual({
    isStraightFlush: false,
    cards: null
  });
});

test('recognises not straight flush C', () => {
  expect(hasStraightFlush(notStraightC)).toEqual({
    isStraightFlush: false,
    cards: null
  });
});

test('recognises not straight flush D', () => {
  expect(hasStraightFlush(notStraightD)).toEqual({
    isStraightFlush: false,
    cards: null
  });
});

test('recognises not straight flush E', () => {
  expect(hasStraightFlush(notStraightE)).toEqual({
    isStraightFlush: false,
    cards: null
  });
});
