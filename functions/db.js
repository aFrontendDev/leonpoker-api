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
    return await docClient.put(params).promise();
  } catch(err) {
    // TODO error logging
    console.log('fail', err);
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

module.exports = {
  checkDB,
  createUser,
  createGame,
  addPlayerToGame,
}

/*
fs.writeFile('testData.json', JSON.stringify(result, null, 2), err => {
  if (err) {
    console.log('ERROR', err)
  }
});
*/
