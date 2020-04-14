const { makePack, getFlopCards, getTurnCard, getRiverCard } = require('../functions/poker');

let tableCardsA = [];
let packA = makePack();

test('should get 3 cards from flop', () => {
  const res = getFlopCards(packA, tableCardsA);
  tableCardsA = res.tableCards;
  packA = res.cards;

  expect(res.cards).toHaveLength(49);
  expect(res.tableCards).toHaveLength(3);
});

test('should get 1 cards from Turn resulting in 4 table cards', () => {
  const res = getTurnCard(packA, tableCardsA);
  tableCardsA = res.tableCards;
  packA = res.cards;

  expect(res.cards).toHaveLength(48);
  expect(res.tableCards).toHaveLength(4);
});

test('should get 1 cards from River resulting in 5 table cards', () => {
  const res = getRiverCard(packA, tableCardsA);
  tableCardsA = res.tableCards;
  packA = res.cards;

  expect(res.cards).toHaveLength(47);
  expect(res.tableCards).toHaveLength(5);
});