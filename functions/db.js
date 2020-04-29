const AWS = require("aws-sdk");
const fs = require('fs');
const { v4: uuidv4, v1: uuidv1 } = require('uuid'); // v4 random, v1 timestamp plus random
const { makePack, dealHands } = require('../functions/poker');

AWS.config.loadFromPath('awsconfig.json');
const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

const checkDB = async () => {
  const params = {
    TableName: "gameUsers",
    Key: {
      "userID": "test1"
    }
  };

  return await docClient.get(params).promise();
};

const createUser = async data => {
  const { name } = data || {};
  const id = uuidv1();
  const item = {
    "userID": id,
    "games": [],
  }

  if (name && typeof name !== 'undefined' && name.length > 0) {
    item["name"] = name;
  }

  const params = {
    TableName: "gameUsers",
    Item: item
  };

  try {
    const result = await docClient.put(params).promise();
    return true;
  } catch(err) {
    // TODO error logging
    console.log('fail', err);
    return false;
  }
};

const createGame = async data => {
  const { playerID } = data || {};
  const id = uuidv1();
  const item = {
    "gameID": id,
    "players": docClient.createSet([playerID]),
    "admin": playerID,
    "playerChips": {},
    "rounds": {},
  }

  const params = {
    TableName: "games",
    Item: item
  };

  try {
    const result = await docClient.put(params).promise();
    return id;
  } catch(err) {
    // TODO error logging
    console.log('fail', err);
    return false;
  }
};

const addPlayerToGame = async data => {
  const { playerID, gameID } = data || {};

  const params = {
    TableName: "games",
    Key: {
      "gameID": gameID,
    },
    UpdateExpression: "SET #p = list_append(#p, :val)",
    ExpressionAttributeNames: {
      "#p": "players"
    },
    ExpressionAttributeValues: {
      ":val": [playerID]
    },
    ReturnValues: "UPDATED_NEW"
  };

  try {
    const result = await docClient.update(params).promise();
    return true;
  } catch(err) {
    // TODO error logging
    console.log('fail', err);
    return false;
  }
};

const getGameData = async gameID => {
  if (!gameID || typeof gameID === 'undefined') {
    return null;
  }

  const params = {
    TableName: "games",
    Key: {
      "gameID": gameID
    }
  };

  const gameData = await docClient.get(params).promise();
  const game = gameData.Item;
  if (!game || typeof game === 'undefined') {
    console.log('no Item')
    return null;
  }

  return game;
};

const createGameChips = players => {
  return players.reduce((res, player) => {
    res[player] = 2000;
    return res;
  }, {});
};

const getLastObjectItem = obj => {
  if (!obj || typeof obj === 'undefined') {
    return null;
  }

  const keys = Object.keys(obj);
  const lastKey = keys[keys.length - 1];
  return {
    lastKey,
    lastItem: obj[lastKey]
  };
}

const addBet = async data => {
  const { playerID, gameID, matchedBet, raiseValue } = data || {};
  
  // get game data
  const gameData = await getGameData(gameID);
  if (!gameData) {
    // TODO error logging
    console.log('no gameData')
    return {
      success: false,
      errorMsg: 'Game not found',
    };
  }

  const { players, playerChips, rounds } = gameData || {};
  if (!players.includes(playerID)) {
    // TODO error logging
    console.log('player not in game')
    return {
      success: false,
      errorMsg: 'Player not found in this game',
    };
  }

  const { lastKey: latestRoundKey, lastItem: latestRound } = getLastObjectItem(rounds);
  if (!latestRound) {
    // TODO error logging
    console.log('Couldnt get latest round')
    return {
      success: false,
      errorMsg: 'Couldnt get latest round',
    };
  }

  const { players: roundPlayers, pots } = latestRound;

  if (!roundPlayers.includes(playerID)) {
    // TODO error logging
    console.log('player not in round')
    return {
      success: false,
      errorMsg: 'Player not found in this round',
    };
  }

  const { lastKey: latestPotKey, lastItem: latestPot } = getLastObjectItem(pots);
  if (!latestPot) {
    // TODO error logging
    console.log('Couldnt get latest pot')
    return {
      success: false,
      errorMsg: 'Couldnt get latest pot',
    };
  }

  let { players: potPlayers, order: potOrder, playerBetting, currentPot, highestBet, betting } = latestPot;

  if (!potPlayers.includes(playerID)) {
    // TODO error logging
    console.log('player not in pot')
    return {
      success: false,
      errorMsg: 'Player not found in this pot',
    };
  }

  const { lastKey: latestBettingKey, lastItem: latestBetting } = getLastObjectItem(betting);
  if (!latestBetting) {
    // TODO error logging
    console.log('Couldnt get latest betting')
    return {
      success: false,
      errorMsg: 'Couldnt get latest betting',
    };
  }

  let { minBet, completed, nextToBet, bets } = latestBetting;
  if (completed || playerID !== nextToBet) {
    // TODO error logging
    console.log('betting round completed, or player is not next to bet')
    return {
      success: false,
      errorMsg: 'betting round completed, or player is not next to bet',
    };
  }

  const overallBetValue = minBet + raiseValue;
  const playersChips = playerChips[playerID];
  if (overallBetValue > playersChips) {
    // TODO error logging
    console.log('Player does not have required chips')
    return {
      success: false,
      errorMsg: 'Player does not have required chips',
    };
  }

  // actually add bet now and update other areas

  // deduct from playerChips
  const newPlayerChipsTotal = playersChips - overallBetValue;
  playerChips[playerID] = newPlayerChipsTotal;

  // update overall playerBetting for this round
  const playerBetTotal = playerBetting[playerID];
  playerBetting[playerID] = playerBetTotal ? playerBetTotal + overallBetValue : overallBetValue;

  // update currentPot
  latestPot.currentPot = currentPot + overallBetValue;

  // update highestBet
  latestPot.highestBet = overallBetValue > highestBet ? overallBetValue : highestBet;

  // update minBet
  const updatedMinBet = overallBetValue > minBet ? overallBetValue : minBet;
  latestBetting.minBet = updatedMinBet;

  const lastPotPlayer = potOrder[potOrder.length - 1];
  const playerPosition = potOrder.indexOf(playerID);
  const playerIsLast = potOrder.length - 1 === playerPosition;
  const nextPlayer = playerIsLast ? potOrder[0] : potOrder[playerPosition + 1];
  const nextPlayerBet = bets[nextPlayer] ? bets[nextPlayer] : 0;

  // update completed if needed
  completed = nextPlayerBet < updatedMinBet ? false : true;

  // update nextToBet if needed
  latestBetting.nextToBet = nextPlayerBet < updatedMinBet ? nextPlayer : null;

  // update bets with players bet
  bets[playerID] = overallBetValue;

  // latestRound - latestRoundKey
  // latestPot - latestPotKey
  // latestBetting - latestBettingKey

  // return {
  //   updatedMinBet,
  //   updatedPot: currentPot + overallBetValue,
  //   updatedHighestBet: overallBetValue > highestBet ? overallBetValue : highestBet,
  //   updatedNextToBet: nextPlayerBet < updatedMinBet ? `nextPlayer is ${nextPlayer}` : 'null',
  //   rounds
  // };


  const params = {
    TableName: "games",
    Key: {
      "gameID": gameID,
    },
    UpdateExpression: "SET rounds = :a",
    ExpressionAttributeValues: {
      ":a": rounds
    },
    ReturnValues: "UPDATED_NEW"
  };

  try {
    const result = await docClient.update(params).promise();
    return true;
  } catch(err) {
    // TODO error logging
    console.log('fail', err);
    return false;
  }
};

const startGame = async gameID => {
  if (!gameID || typeof gameID === 'undefined') {
    return null;
  }

  // get game data
  const gameData = await getGameData(gameID);
  if (!gameData) {
    console.log('no gameData')
    return false;
  }

  const { players } = gameData || {};
  const chips = createGameChips(players);
  const pack = makePack();
  const dealtHands = dealHands(pack, players);
  const { players: playerCards, cards } = dealtHands;
  const bigBlind = 50;
  const smallBlind = bigBlind / 2;
  const dealer = players[0];
  const smallBlindPlayer = players.length > 2 ? players[1] : players[0];
  const bigBlindPlayer = players.length > 2 ? players[2] : players[1];
  const smallGameFirstBet = {
    2: players[0],
    3: players[0],
  };
  const firstBet = players.length > 3 ? players[3] : smallGameFirstBet[players.length];

  const roundData = {
    1: {
      "players": players,
      "playerHands": playerCards,
      "pack": cards,
      "order": players,
      "bigBlind": bigBlind,
      "smallBlind": smallBlind,
      "dealer": dealer,
      "smallBlindPlayer": smallBlindPlayer,
      "bigBlindPlayer": bigBlindPlayer,
      "pots": {
        1: {
          "players": players,
          "order": players,
          "playerBetting": {
						[smallBlindPlayer]: smallBlind,
						[bigBlindPlayer]: bigBlind,
					},
          "currentPot": bigBlind + smallBlind,
          "highestBet": bigBlind, // if a player goes all in or runs out of chips then players can only match for this pot. Extra will go into a new pot
          "betting": {
            1: {
              "minBet": bigBlind,
              "completed": false,
              "nextToBet": firstBet,
              "bets": {
                [smallBlindPlayer]: smallBlind,
                [bigBlindPlayer]: bigBlind
              }
            }
          }
        }
      }
    }
  };

  const params = {
    TableName: "games",
    Key: {
      "gameID": gameID,
    },
    UpdateExpression: "SET playerChips = :a, rounds = :b",
    ExpressionAttributeValues: {
      ":a": chips,
      ":b": roundData
    },
    ReturnValues: "UPDATED_NEW"
  };

  try {
    const result = await docClient.update(params).promise();
    return true;
  } catch(err) {
    // TODO error logging
    console.log('fail', err);
    return false;
  }
};

module.exports = {
  checkDB,
  createUser,
  createGame,
  addPlayerToGame,
  startGame,
  addBet,
}

/*
fs.writeFile('testData.json', JSON.stringify(result, null, 2), err => {
  if (err) {
    console.log('ERROR', err)
  }
});
*/
