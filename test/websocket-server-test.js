const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');
const moment = require('moment');
const axios = require('axios');

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

const DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS'
const MESSAGE_INTERVAL = 10 * 1000
const now = moment()

const sendMessageLoop = setInterval(async () => {
  let flagValue = getRandomInt(10);
  let randomTeamID = getRandomInt(5);

  // Add the score to the scoreboard
  const { data } = await axios.get(`http://localhost:3004/1.0/scoreboard`)
  const team = data.find(x => x.id === randomTeamID)

  if (!team) return;

  team.value += flagValue;
  team.last_submit_time = now.utc().format(DATE_FORMAT) + 'Z'

  try {
    const {ok} = await axios.put(`http://localhost:3004/scoreboard/${team.id}`, team)
    console.log(`${team.team.name} / Pts: ${flagValue} / Total: ${team.value}`);
  } catch (err) {
    console.debug(team)
    console.error(err.message)
  }

  const msg = JSON.stringify({
    metadata: {
      type: 'score-updated',
      teamid: team.id,
      score: {
        submit_time: team.last_submit_time,
        value: flagValue,
        total: team.value
      }
    }
  });

  wss.clients.forEach(ws => ws.send(msg))

  // Try fake put on scoreboard for team
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
