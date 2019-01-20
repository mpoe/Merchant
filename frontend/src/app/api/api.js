import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8000');

export function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

socket.on('user connected', (data) => {
  console.log('test');
})
