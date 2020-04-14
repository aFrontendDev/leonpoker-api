const { getBestHand } =  require('../functions/scoreHands');
const { forceArray, convertToNumbers, getRandomInt, removeItemFromArr } = require('../helpers/dataHelpers');

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

// FUNCTION getWinner
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
};

const getPlayersCards = (player, cards) => {
  // get randomCard
  const highestCardIndex = cards.length - 1;
  const cardIndex = getRandomInt(0, highestCardIndex);
  const card = cards[cardIndex];

  // Add card to players hand
  if (player.hasOwnProperty('hand')) {
    player['hand'].push(card);
  } else {
    player['hand'] = [card];
  }

  // remove card from pack of cards
  removeItemFromArr(cards, cardIndex);

  return player;
};

// FUNCTION dealHands
// Cards: array of strings
// ['h4', 'd2', 'c8', 's15', 'h12']
// Players: array of objects
// [{user: 123}]
const dealHands = (cards, players) => {
  const cardsArr = forceArray(cards);
  const playersArr = forceArray(players);

  if (!cardsArr || cardsArr.length < 1 || !playersArr || playersArr.length < 1) {
    return null;
  }

  // first deal
  let updatedPlayers = playersArr.map(player => getPlayersCards(player, cardsArr));

  // second deal
  updatedPlayers = playersArr.map(player => getPlayersCards(player, cardsArr));

  return {
    players: updatedPlayers,
    cards: cardsArr
  };
};

// FUNCTION getCards
// Cards: array of strings
// ['h4', 'd2', 'c8', 's15', 'h12']
// Amount: int
// 3
const getCards = (cards, amount) => {
  const cardsArr = forceArray(cards);
  if (!cardsArr || cardsArr.length < 1) {
    return null;
  }

  let requestedCards = [];
  for (let i = 0; i < amount; i++) {
    const highestCardIndex = cardsArr.length - 1;
    const cardIndex = getRandomInt(0, highestCardIndex);
    const card = cardsArr[cardIndex];
    requestedCards.push(card);

    // remove card from pack of cards
    removeItemFromArr(cardsArr, cardIndex);
  }

  return {
    cards: cardsArr,
    requestedCards,
  }
};

// FUNCTION getTableCards
// Cards: array of strings
// ['h4', 'd2', 'c8', 's15', 'h12']
// TableCards: array of strings (could be empty)
// [] || ['h2', 's5', 'd12']
const getTableCards = (cards, tableCards, numberOfCards) => {
  const cardsArr = forceArray(cards);
  const tableCardsArr = forceArray(tableCards);
  if (!cardsArr || cardsArr.length < 1) {
    return null;
  }

  const updatedCards = getCards(cardsArr, numberOfCards);
  const { cards: remainingCards, requestedCards } = updatedCards || {};

  return {
    cards: remainingCards,
    tableCards: [...tableCardsArr, ...requestedCards]
  }
};

// FUNCTION getFlopCards
// Cards: array of strings
// ['h4', 'd2', 'c8', 's15', 'h12']
// TableCards: array of strings, should be empty
// []
const getFlopCards = (cards, tableCards) => {
  const cardsArr = forceArray(cards);
  const tableCardsArr = forceArray(tableCards);
  if (!cardsArr || cardsArr.length < 1) {
    return null;
  }

  return getTableCards(cardsArr, tableCardsArr, 3);
};

// FUNCTION getTurnCard
// Cards: array of strings
// ['h4', 'd2', 'c8', 's15', 'h12']
// TableCards: array of strings, should be empty
// []
const getTurnCard = (cards, tableCards) => {
  const cardsArr = forceArray(cards);
  const tableCardsArr = forceArray(tableCards);
  if (!cardsArr || cardsArr.length < 1) {
    return null;
  }

  return getTableCards(cardsArr, tableCardsArr, 1);
};

// FUNCTION getRiverCard
// Cards: array of strings
// ['h4', 'd2', 'c8', 's15', 'h12']
// TableCards: array of strings, should be empty
// []
const getRiverCard = (cards, tableCards) => {
  const cardsArr = forceArray(cards);
  const tableCardsArr = forceArray(tableCards);
  if (!cardsArr || cardsArr.length < 1) {
    return null;
  }

  return getTableCards(cardsArr, tableCardsArr, 1);
};


module.exports = {
  makePack,
  getWinner,
  dealHands,
  getFlopCards,
  getTurnCard,
  getRiverCard,
};
