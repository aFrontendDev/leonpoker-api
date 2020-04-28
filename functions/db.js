const AWS = require("aws-sdk");
AWS.config.loadFromPath('awsconfig.json');
const fs = require('fs');
const { v4: uuidv4, v1: uuidv1 } = require('uuid'); // v4 random, v1 timestamp plus random

myConfig = new AWS.Config();
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
  console.log({gameData});
  if (!gameData) {
    console.log('no gameData')
    return false;
  }

  const { players } = gameData || {};
  const chips = createGameChips(players);
  const roundData = {
    1: {
      "players": players,
      "order": players,
      "bigBlind": 50,
      "smallBlind": 25,
      "pots": {
        1: {
          "players": players,
          "currentPot": 0,
          "highestBet": 0,
          "betting": {
            1: {
              "minBet": 50,
              "completed": false,
              "nextToBet": players[0],
              "bets": {}
            }
          }
        }
      }
    }
  };
  console.log('ROUND DATA', roundData);

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
  console.log('PARAMS', params)

  try {
    const result = await docClient.update(params).promise();
    console.log('done', result);
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
