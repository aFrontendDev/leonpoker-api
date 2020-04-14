const { getBestHand } =  require('../functions/scoreHands');
const { forceArray, convertToNumbers } = require('../helpers/dataHelpers');

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

const getTopHands = (cards, sortby) => {
  var handsByPoints = cards.reduce((res, hand) => {
    const points = hand[sortby];
    if (res.hasOwnProperty(points)) {
      res[points].push(hand);
    } else {
      res[points] = [hand];
    }

    return res;
  }, {});

  let scores = Object.keys(handsByPoints);
  scores = scores.sort((a, b) => b - a);
  const topScore = scores[0];
  const bestHands = handsByPoints[topScore];
  return bestHands;
};

// FUNCTION checkHands
// tableCards: array of strings
// ['h4', 'd2', 'c8', 's15', 'h12']
// hands: array of objects
// [{user: 123, hand: ['h1, 'd8']}]
const getWinner = (tableCards, hands) => {
  const tableCardsArr = forceArray(tableCards);
  const handsArr = forceArray(hands);

  const playerScores = handsArr.map(player => {
    const { user, hand } = player || {};
    const score = getBestHand([...hand, ...tableCardsArr]);
    const totalScore = score.score;
    const handNumbers = convertToNumbers(hand);
    const handNumbersDesc = handNumbers.sort((a, b) => b - a);
    const highestPlayerCard = handNumbersDesc[0];
    const kickerCard = handNumbersDesc[1];

    return {
      user,
      hand,
      score,
      highestPlayerCard,
      kickerCard,
      totalScore,
    };
  });

  // Look for overall winner by hand score
  const bestHandByHand = getTopHands(playerScores, 'totalScore');
  // if only 1 hand then we have a winner
  if (bestHandByHand.length === 1) {
    return {
      outrightWinner: true,
      hand: bestHandByHand
    };
  }

  // more than 1 hand with same score so we need to determine high card for the winner
  const bestHandByHighCard = getTopHands(bestHandByHand, 'highestPlayerCard');
  // if only 1 hand then we have a winner
  if (bestHandByHighCard.length === 1) {
    return {
      highcardWinner: true,
      hand: bestHandByHighCard
    };
  }

  // more than 1 hand with same score & same high card so we need to determine highest kicker card for the winner
  const bestHandByKicker = getTopHands(bestHandByHighCard, 'kickerCard');
  // if only 1 hand then we have a winner
  if (bestHandByKicker.length === 1) {
    return {
      kickerWinner: true,
      hand: bestHandByKicker
    };
  }

  return {
    draw: true,
    hand: bestHandByKicker
  };
}

module.exports = {
  makePack,
  getWinner,
};
