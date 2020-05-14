const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');
const moment = require('moment');
const sample = require('lodash/sample');

const server = https.createServer({
  cert: fs.readFileSync('.env/local/localhost.pem'),
  key: fs.readFileSync('.env/local/localhost-key.pem')
});
const WSS_SERVER_PORT = 8080;
const wss = new WebSocket.Server({ server });
const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

wss.on('connection', function connection(ws) {
  console.log('Client connected: ', ws._socket.remoteAddress);

  var scoreTotal = 18;
  var counter = 0;
  var now = moment();

  ws.on('message', (message) => console.log('received: %s', message));

  // Fake successful flags submission
  setInterval(() => {
    counter++;
    var flagValue = getRandomInt(10);
    var teamid = sample([1, 2, 6]);
    var submit_time = now.add(1, 'hour');
    scoreTotal += flagValue;

    console.log(counter, scoreTotal, submit_time.format('YYYY-MM-DDTHH:mm:ss'));

    // Fake client response
    const msg = JSON.stringify({
      metadata: {
        type: 'score-updated',
        teamid: teamid,
        score: {
          submit_time: submit_time.format('YYYY-MM-DDTHH:mm:ss.SSS')+'Z',
          value: flagValue,
          total: scoreTotal
        }
      }
    });

    ws.send(msg);
  }, 2000);
});


server.listen(WSS_SERVER_PORT);
