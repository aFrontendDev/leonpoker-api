const express = require('express');

const app = express();

//Used to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded());

// server configuration
const PORT = 9001;


// START *** Settings headers to allow cross domain requests
app.all('*', function(req, res, next) {
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
app.post('/testpost', function (req, res) {
  const name = req.body.name;

  console.log({name});
  res.send({res: `Name is: ${name}`});
});

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});