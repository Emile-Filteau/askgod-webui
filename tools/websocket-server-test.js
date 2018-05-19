const moment = require('moment');
const WebSocket = require('ws');
const sample = require('lodash/sample');

const wss = new WebSocket.Server({
  port: 8080,
});

function start(){
  wss.on('connection', function connection(ws) {
    console.log('Client connected: ', ws._socket.remoteAddress);

    var scoreTotal = 18;
    var counter = 0;
    var now = moment();

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
    });

    setInterval(() => {
      counter++;
      var flagValue = getRandomInt(10);
      var teamid = sample([1, 2, 6]);
      var submit_time = now.add(1, 'hour');

      scoreTotal += flagValue;

      console.log(counter, scoreTotal, submit_time.format('YYYY-MM-DDTHH:mm:ss'));

      let msg = JSON.stringify({
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
}

function check(){
  if(!wss || wss.readyState == 3) start();
}

start();

setInterval(check, 5000);
