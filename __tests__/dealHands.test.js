const { makePack, dealHands } = require('../functions/poker');

test('player should have 2 cards', () => {
  const cards = makePack();
  const players = [
    {user: 'playerA'},
    {user: 'playerB'},
    {user: 'playerC'},
    {user: 'playerD'}
  ];

  const playerHands = dealHands(cards, players);

  expect(playerHands.players[0].hand).toHaveLength(2);
});

test('player should have 2 cards if just an array of strings passed', () => {
  const cards = makePack();
  const players = ['playerA', 'playerB', 'playerC', 'playerD'];
  const playerHands = dealHands(cards, players);

  expect(playerHands.players[1].hand).toHaveLength(2);
});

test('pack should have 44 cards left', () => {
  const cards = makePack();
  const players = [
    {user: 'playerA'},
    {user: 'playerB'},
    {user: 'playerC'},
    {user: 'playerD'}
  ];

  const playerHands = dealHands(cards, players);

  expect(playerHands.cards).toHaveLength(44);
});
