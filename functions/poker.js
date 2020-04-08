// FUNCTION checkHands
// creates array of strings for the cards
// ['h2', 'h3', etc]
// first letter is suit: h = hearts, s = spades, c = clubs, d = diamonds
// number ranges from 2 - 14. 2 - 10 = normal cards. 11 = jack. 12 = queen. 13 = king. 14 = ace (ace high).
const makePack = () => {
  const pack = [];
  const suits = ['h', 's', 'c', 'd'];
  suits.forEach((suit) => {
    for (let i = 2; i < 15; i++) {
      pack.push(`${suit}${i}`);
    }
  });
  return pack;
};

// FUNCTION checkHands
// tableCards: array of strings
// ['h4', 'd2', 'c8', 's15', 'h12']
// hands: array of objects
// [{user: 123, hand: ['h1, 'd8']}]
const checkHands = (tableCards, hands) => {
  console.log({ tableCards, hands });
}

module.exports = {
  makePack,
  checkHands,
};
