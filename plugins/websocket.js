//const HOST = 'wss://askgod.nsec/1.0/events?type=timeline'
const WS_URL = 'ws://localhost:8080';

export default ({ store }) => {
  const socket = new WebSocket(WS_URL);

  // if (socket.readyState !== 1) {
  //   console.warn('Socket not available');
  //   return;
  // }

  socket.onopen = (event) => {
    console.log('Websocket connected')
  }

  socket.onmessage = (event) => {
    store.dispatch('WEBSOCKET_EVENT', JSON.parse(event.data))
  }

  // On store update, send event if necessary
  store.subscribe(mutation => {
    if (mutation.type === 'UPDATE_DATA') {
      socket.emit('update', mutation.payload)
    }
  })
}
