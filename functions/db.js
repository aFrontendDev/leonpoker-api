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
}

const createGameChips = players => {
  return players.reduce((res, player) => {
    res[player] = 2000;
    return res;
  }, {});
}

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
          "playerBetting": {
						[smallBlindPlayer]: {
							out: false,
							bet: smallBlind,
						},
						[bigBlindPlayer]: {
              out: false,
							bet: bigBlind,
            }
					},
          "currentPot": bigBlind + smallBlind,
          "highestBet": bigBlind,
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
}

/*
fs.writeFile('testData.json', JSON.stringify(result, null, 2), err => {
  if (err) {
    console.log('ERROR', err)
  }
});
*/
