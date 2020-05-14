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

function noop() {}

function heartbeat() {
  this.isAlive = true;
}

wss.on('connection', function connection(ws) {
  console.log('Client connected: ', ws._socket.remoteAddress);

  ws.on('message', (message) => {
    this.isAlive = true;
    console.log('received: %s', message)
  });
});

wss.on('close', function close() {
  clearInterval(sendMessageLoop);
  clearInterval(healthCheckLoop);
});

const MESSAGE_INTERVAL = 10 * 1000
var scoreTotal = 18
var counter = 0
var now = moment()

const sendMessageLoop = setInterval(() => {
  counter++;
  var flagValue = getRandomInt(10);
  var teamid = sample([1, 2, 6]);
  var submit_time = now.add(1, 'hour');
  scoreTotal += flagValue;

  console.log(counter, scoreTotal, submit_time.format('YYYY-MM-DDTHH:mm:ss'));

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

  wss.clients.forEach(ws => ws.send(msg))
}, MESSAGE_INTERVAL);

const healthCheckLoop = setInterval(() => {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping(noop);
  });
}, 30000);

server.listen(WSS_SERVER_PORT, () => {
  console.log("WSS Server ready!")
});
