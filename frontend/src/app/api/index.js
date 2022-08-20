export function getClientID() {
	socket.emit('GET_ID_REQ');
}

socket.on('GET_ID_RES', (clientID) => {
	// do something.
});

export function setUserName(username) {
	socket.emit('SET_USERNAME_REQ', username);
}

socket.on('SET_USERNAME_RES', (username) => {
	// do something.
});

export function joinRoom(roomId) {
	socket.emit('JOIN_ROOM', roomId);
}

export function getRooms() {
	socket.emit('GET_ROOMS');
}

socket.on('GOT_ROOMS', (list) => {
	// do something.
});

export function createRoomRequest(roomInfo) {
	socket.emit('GET_NEXT_ROOM_ID', roomInfo);
}

socket.on('GET_NEXT_ROOM_ID_RES', (roomId, roomInfo) => {
	socket.emit('CREATE_ROOM', { roomId, roomSettings: roomInfo }); // must emit object, since socket.on cannot take more than 1 parameter.
});

socket.on('JOINED_ROOM', ((room) => {
	// do something.
}));

export function leaveRoom(roomId, userId) {
	socket.emit('LEAVE_ROOM', { roomId, userId });
}
