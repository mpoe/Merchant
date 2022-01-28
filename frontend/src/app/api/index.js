import openSocket from 'socket.io-client';
import {
	setUsername,
	setUserid,
	setRoomList,
	setRoom,
} from '../redux/actions/index';

import store from '../redux/reducers';

const socket = openSocket('http://localhost:8000');

export function getClientID() {
	socket.emit('GET_ID_REQ');
}

socket.on('GET_ID_RES', (clientID) => {
	store.dispatch(setUserid(clientID));
});

export function setUserName(username) {
	socket.emit('SET_USERNAME_REQ', username);
}

socket.on('SET_USERNAME_RES', (username) => {
	// store.dispatch(setUsername(username));
});

export function joinRoom(roomId) {
	socket.emit('JOIN_ROOM', roomId);
}

export function getRooms() {
	socket.emit('GET_ROOMS');
}

socket.on('GOT_ROOMS', (list) => {
	store.dispatch(setRoomList(list));
});

export function createRoomRequest(roomInfo) {
	console.log('roomInfo', roomInfo);
	socket.emit('GET_NEXT_ROOM_ID', roomInfo);
}

socket.on('GET_NEXT_ROOM_ID_RES', (roomId, roomInfo) => {
	socket.emit('CREATE_ROOM', { roomId, roomSettings: roomInfo }); // must emit object, since socket.on cannot take more than 1 parameter.
});

socket.on('JOINED_ROOM', ((room) => {
	store.dispatch(setRoom(room));
}));

export function leaveRoom(roomId, userId) {
	socket.emit('LEAVE_ROOM', { roomId, userId });
}
