const { hasStraight } = require('../functions/pokerHands');

const straightA = ['h2', 'h3', 'h4', 'h5', 'h6', 'c2', 'c3'];
const straightB = ['c5', 'h2', 'h3', 'h4', 'h5', 'h6', 'c2'];
const straightC = ['c2', 'c3', 'h2', 'h3', 'h4', 'h5', 'h6'];
const straightD = ['h3', 'c3', 'h5', 'h2', 'h4', 'd5', 'h6'];
const straightE = ['h3', 'c3', 'h9', 'h2', 's4', 'd5', 'c6'];

const notStraightA = ['h2', 'h3', 'h4', 'h5', 'd7', 'c2'];
const notStraightB = ['2', 'hearts', 1, 123, null, {}];
const notStraightC = [];
const notStraightD = null;
const notStraightE = 'not an array';

test('recognises straight A', () => {
  expect(hasStraight(straightA)).toEqual({
    isStraight: true,
    cards: [2, 3, 4, 5, 6]
  });
});

test('recognises straight B', () => {
  expect(hasStraight(straightB)).toEqual({
    isStraight: true,
    cards: [2, 3, 4, 5, 6]
  });
});

test('recognises straight C', () => {
  expect(hasStraight(straightC)).toEqual({
    isStraight: true,
    cards: [2, 3, 4, 5, 6]
  });
});

test('recognises straight D', () => {
  expect(hasStraight(straightD)).toEqual({
    isStraight: true,
    cards: [2, 3, 4, 5, 6]
  });
});

test('recognises straight E', () => {
  expect(hasStraight(straightE)).toEqual({
    isStraight: true,
    cards: [2, 3, 4, 5, 6]
  });
});

test('recognises not a straight A', () => {
  expect(hasStraight(notStraightA)).toEqual({
    isStraight: false,
    cards: null
  });
});

test('recognises not a straight B', () => {
  expect(hasStraight(notStraightB)).toEqual({
    isStraight: false,
    cards: null
  });
});

test('recognises not a straight C', () => {
  expect(hasStraight(notStraightC)).toEqual({
    isStraight: false,
    cards: null
  });
});

test('recognises not a straight D', () => {
  expect(hasStraight(notStraightD)).toEqual({
    isStraight: false,
    cards: null
  });
});

test('recognises not a straight E', () => {
  expect(hasStraight(notStraightE)).toEqual({
    isStraight: false,
    cards: null
  });
});