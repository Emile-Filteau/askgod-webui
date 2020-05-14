export default ({ store }) => {
  function connect() {
    const ws = new WebSocket(process.env.WS_URL);

    ws.onopen = function(event) {
      console.log('Websocket connected')
    }

    ws.onmessage = function(event) {
      store.dispatch('WEBSOCKET_EVENT', JSON.parse(event.data))
    }

    ws.onclose = function(e) {
      console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
      setTimeout(() => connect(), 1000);
    };

    ws.onerror = function(err) {
      console.error('Socket encountered error: ', err.message, 'Closing socket');
      ws.close()
    };

    // On store update, send event if necessary
    store.subscribe(mutation => {
      if (mutation.type === 'UPDATE_DATA') {
        socket.emit('update', mutation.payload)
      }
    })
  }

  connect();
}
