const { hasRoyalStraight } = require('../functions/scoreHands');

const hasRoyalStraightA = ['h2', 'c10', 'c12', 'd5', 'c14', 'c13', 'c11'];

const notRoyalStraightA = ['h2', 'h3', 'h4', 'h5', 'd7', 'c2'];
const notRoyalStraightB = ['2', 'hearts', 1, 123, null, {}];
const notRoyalStraightC = [];
const notRoyalStraightD = null;
const notRoyalStraightE = 'not an array';
const notRoyalStraightF = ['h2', 'h10', 'h7', 'c5', 'h9', 'h8', 'h6'];

test('recognises royal straight', () => {
  expect(hasRoyalStraight(hasRoyalStraightA)).toBe(true);
});

test('recognises not royal straight A', () => {
  expect(hasRoyalStraight(notRoyalStraightA)).toBe(false);
});

test('recognises not royal straight B', () => {
  expect(hasRoyalStraight(notRoyalStraightB)).toBe(false);
});

test('recognises not royal straight C', () => {
  expect(hasRoyalStraight(notRoyalStraightC)).toBe(false);
});

test('recognises not royal straight D', () => {
  expect(hasRoyalStraight(notRoyalStraightD)).toBe(false);
});

test('recognises not royal straight E', () => {
  expect(hasRoyalStraight(notRoyalStraightE)).toBe(false);
});

test('recognises not royal straight F', () => {
  expect(hasRoyalStraight(notRoyalStraightF)).toBe(false);
});
