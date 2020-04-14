const { makePack, dealHands, getFlopCards, getTurnCard, getRiverCard } = require('../functions/poker');

let tableCardsA = [];
let packA = makePack();
const players = [
  {user: 'playerA'},
  {user: 'playerB'},
  {user: 'playerC'},
  {user: 'playerD'}
];
const playerHands = dealHands(packA, players);
packA = playerHands.cards;

test('player should have 2 cards', () => {
  expect(playerHands.players[0].hand).toHaveLength(2);
});

test('pack should have 44 cards left', () => {
  expect(playerHands.cards).toHaveLength(44);
});

test('should get 3 cards from flop', () => {
  const res = getFlopCards(packA, tableCardsA);
  tableCardsA = res.tableCards;
  packA = res.cards;

  expect(res.cards).toHaveLength(41);
  expect(res.tableCards).toHaveLength(3);
});

test('should get 1 cards from Turn resulting in 4 table cards', () => {
  const res = getTurnCard(packA, tableCardsA);
  tableCardsA = res.tableCards;
  packA = res.cards;

  expect(res.cards).toHaveLength(40);
  expect(res.tableCards).toHaveLength(4);
});

test('should get 1 cards from River resulting in 5 table cards', () => {
  const res = getRiverCard(packA, tableCardsA);
  tableCardsA = res.tableCards;
  packA = res.cards;

  expect(res.cards).toHaveLength(39);
  expect(res.tableCards).toHaveLength(5);
});