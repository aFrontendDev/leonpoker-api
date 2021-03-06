const express = require('express');
const { getWinner } = require("../functions/poker");
const { checkDB, createUser, createGame, addPlayerToGame, startGame, addBet } = require('../functions/db');

const app = express();

// Used to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded());

// server configuration
const PORT = 9001;


// START *** Settings headers to allow cross domain requests
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// END *****

// create a route for the app
app.get('/', (req, res) => {
  res.send('Hello World');
});

// check we can connect and get data from table
app.get('/dbcheck', async (req, res) => {
  const canConnect = await checkDB();
  res.send(canConnect);
});

// testing only
app.post('/getwinner', (req, res) => {
  const { tableCards, hands } = req.body;
  const result = getWinner(tableCards, hands)
  res.send(result);
});

app.post('/newuser', async (req, res) => {
  const { name } = req.body;
  const result = await createUser({name});
  if (result) {
    res.status(200).send();
  } else {
    res.status(501).send();
  }
});

app.post('/newgame', async (req, res) => {
  const { playerID } = req.body;
  const result = await createGame({playerID});
  res.send({gameID: result});
});

app.post('/addplayertogame', async (req, res) => {
  const { playerID, gameID } = req.body;
  const result = await addPlayerToGame({playerID, gameID});
  if (result) {
    res.status(200).send();
  } else {
    res.status(501).send();
  }
});

app.post('/startgame', async (req, res) => {
  const { gameID } = req.body;
  const result = await startGame(gameID);
  res.send(result);
});

// playerID: '654123', gameID: '96394d10-8953-11ea-b947-716fbd70081b', matchedBet: true, raiseValue: 25
app.post('/addbet', async (req, res) => {
  const { playerID, gameID, matchedBet, raiseValue = 0 } = req.body;
  const result = await addBet({playerID, gameID, matchedBet, raiseValue});
  res.send(result);
});

/*
Example call:
  fetch('http://localhost:9001/testpost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: 'Andrew'})
  }).then(res => {
      console.log({res})
      res.json().then(json => console.log({json}))
  })
*/
app.post('/testpost', (req, res) => {
  const { name } = req.body;

  console.log({ name });
  res.send({ res: `Name is: ${name}` });
});

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
