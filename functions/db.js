const AWS = require("aws-sdk");
AWS.config.loadFromPath('awsconfig.json');
const fs = require('fs');
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

  const result = await docClient.get(params).promise();
  fs.writeFile('testData.json', JSON.stringify(result, null, 2), err => {
    if (err) {
      console.log('ERROR', err)
    }
  });
  return result;
}

module.exports = {
  checkDB,
}
