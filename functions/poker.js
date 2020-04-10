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

// FUNCTION checkHands
// tableCards: array of strings
// ['h4', 'd2', 'c8', 's15', 'h12']
// hands: array of objects
// [{user: 123, hand: ['h1, 'd8']}]
const checkHands = (tableCards, hands) => {
  const tableCardsArr = forceArray(tableCards);
  const handsArr = forceArray(hands);

  const playerScores = handsArr.map(player => {
    const { user, hand } = player || {};
    const score = getBestHand([...hand, ...tableCardsArr]);
    const handNumbers = convertToNumbers(hand);
    const handNumbersDesc = handNumbers.sort((a, b) => b - a);
    const highestPlayerCard = handNumbersDesc[0];
    const kickerCard = handNumbersDesc[1];

    return {
      user,
      hand,
      score,
      highestPlayerCard,
      kickerCard
    };
  });

  // sort by score
  const sortedScores = playerScores.sort((a, b) => {
    return b.score.score - a.score.score;
  });

  // rank the hands
  // is there more than one with each score?
  const handsByScore = sortedScores.reduce((res, hand) => {
    const points = hand.score.score;
    if (res.hasOwnProperty(points)) {
      res[points].push(hand);
    } else {
      res[points] = [hand];
    }

    return res;
  }, {});

  // We now have the hands grouped by score
  // Next we need to see if there are any ties and if so check for ties in highest card
  const handsByScoreKeys = Object.keys(handsByScore);
  const groupedByHighCard = handsByScoreKeys.reduce((highCards, key) => {
    const item = handsByScore[key];
    const itemHighCards = item.reduce((res, hand) => {
      const points = hand.highestPlayerCard;
      if (res.hasOwnProperty(points)) {
        res[points].push(hand);
      } else {
        res[points] = [hand];
      }

      return res;
    }, {});

    highCards[key] = itemHighCards;
    return highCards;
  }, {});

  // Now we have an object with keys for scores and high cards: {13: {9: {}}}
  // We have to now check for further ties and group by kicker
  const groupedByKickerCard = handsByScoreKeys.reduce((highCards, key) => {
    const item = groupedByHighCard[key];
    const highCardKeys = Object.keys(item);

    const highCardItems = highCardKeys.reduce((kickerCards, kickerKey) => {
      const kickerItem = item[kickerKey];

      const kickerItemCards = kickerItem.reduce((res, hand) => {
        const points = hand.kickerCard;
        if (res.hasOwnProperty(points)) {
          res[points].push(hand);
        } else {
          res[points] = [hand];
        }

        return res;
      }, {});

      kickerCards[kickerKey] = kickerItemCards;
      return kickerCards;

    }, {});

    highCards[key] = highCardItems;
    return highCards;
  }, {});

  // Now sort items within kicker card groupings
  handsByScoreKeys.forEach(key => {
    const item = groupedByKickerCard[key];
    var highCardKeys = Object.keys(item);
  
    highCardKeys.forEach(highCardKey => {
      var highCardItem = item[highCardKey];
      var kickerCardKeys = Object.keys(highCardItem);
  
      kickerCardKeys.forEach(kickerCardKey => {
        var kickerCardItem = highCardItem[kickerCardKey];
  
        kickerCardItem.sort((a, b) => {
          return b.kickerCard - a.kickerCard
        });
      });
    });
  });
  
  // Now spread kickers back into highcards
  var spreadKicker = handsByScoreKeys.reduce((obj, key) => {
    const item = groupedByKickerCard[key];
    var highCardKeys = Object.keys(item);
  
    var highCards = highCardKeys.reduce((highCardObj, highCardKey) => {
      var highCardItem = item[highCardKey];
      var kickerCardKeys = Object.keys(highCardItem);
  
      var kickerCards = kickerCardKeys.reduce((kickerCardArr, kickerCardKey) => {
        var kickerCardItem = highCardItem[kickerCardKey];
        kickerCardArr = [...kickerCardArr, ...kickerCardItem];
        return kickerCardArr;
      }, []);
      
      highCardObj[highCardKey] = kickerCards;
      return highCardObj;
    }, {});
  
    obj[key] = highCards;
    return obj;
  }, {});

  // sort by kickers within high cards
  handsByScoreKeys.forEach(key => {
    const item = spreadKicker[key];
    var highCardKeys = Object.keys(item);
  
    highCardKeys.forEach(highCardKey => {
      var highCardItem = item[highCardKey];
  
      highCardItem.sort((a, b) => {
        return b.kickerCard - a.kickerCard
      });
    });
  });

  // spread high cards back into scores
  var spreadHigh = handsByScoreKeys.reduce((obj, key) => {
    const item = spreadKicker[key];
    var highCardKeys = Object.keys(item);
  
    var highCards = highCardKeys.reduce((highCardArr, highCardKey) => {
      var highCardItem = item[highCardKey];
    
      highCardArr = [...highCardArr, ...highCardItem];
      return highCardArr;
    }, []);
  
    obj[key] = highCards;
    return obj;
  }, {});

  // sort by high score
  handsByScoreKeys.forEach(key => {
    const item = spreadHigh[key];
    item.sort((a, b) => {
      return b.highestPlayerCard - a.highestPlayerCard
    });
  });

  
  // spread back to an array
  var spread = handsByScoreKeys.reduce((arr, key) => {
    const item = spreadHigh[key];
  
    arr = [...arr, ...item];
    return arr;
  }, []);

  console.log(spread);
  return spread;
}

module.exports = {
  makePack,
  checkHands,
};
