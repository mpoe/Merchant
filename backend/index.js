// @ts-check
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
var fs = require('fs');

const io = new Server(server, {
	cors: {
		origin: "http://localhost:9000",
		methods: ["GET", "POST"]
	}
});

const port = 8000;

const dbcon = require('./db'); // connection to the database

let users = {};
let rooms = {};

let userNumber = 10000;
let roomId = 44444;

/* dbcon.connect((err) => {
}); // connect to the database, this will happen on server start. */


io.on('connection', (client) => { // client === socket
	client.on('GET_ID_REQ', () => {
		client.emit('GET_ID_RES', client.id);
	})

	client.on('SET_USERNAME_REQ', (username) => {
		users[client.id] = {
			...users[client.id],
			username,
			id: client.id,
		};
	})

	client.on('CREATE_ROOM', ({ roomId, roomSettings }) => {
		if (!getUser(client.id)) {
			createGuestUser(client.id);
		}
		client.join(`room-${roomId}`);
		rooms[`room-${roomId}`] = {
			password: '',
			name: `room-${roomId}`,
			...roomSettings,
			id: roomId,
			users: [],
			host: users[client.id]
		}
		client.emit('JOINED_ROOM', rooms[`room-${roomId}`])
	})

	client.on('GET_ROOMS', () => {
		client.emit('GET_ROOMS_RES', rooms);
	})

	client.on('GET_NEXT_ROOM_ID', (roomInfo) => {
		client.emit('GET_NEXT_ROOM_ID_RES', { roomId, roomInfo });
		roomId++;
	})

	client.on('JOIN_ROOM', (roomId) => {
		if (!getUser(client.id)) {
			createGuestUser(client.id);
		}
		client.join(`room-${roomId}`);
		rooms[`room-${roomId}`] = {
			...rooms[`room-${roomId}`],
			users: (rooms[`room-${roomId}`] ? [...rooms[`room-${roomId}`].users, getUser(client.id)] : [getUser(client.id)]),
		}
		client.emit('JOINED_ROOM', rooms[`room-${roomId}`])
		client.to(`room-${roomId}`).emit('JOINED_ROOM', rooms[`room-${roomId}`]);
		io.emit('ROOM_CREATED', rooms);
	})

	client.on('LEAVE_ROOM', ({ roomId }) => {
		const room = rooms[`room-${roomId}`];
		const users = room.users.filter((user) => user.id !== client.id);
		if (users.length === 0) {
			const { [`room-${roomId}`]: omit, ...rest } = rooms;
			rooms = rest;
			io.emit('ROOM_REMOVED', rooms);
			return;
		}
		rooms = {
			...rooms,
			[`room-${roomId}`]: {
				...rooms[`room-${roomId}`],
				users,
			},
		}
		client.to(`room-${roomId}`).emit('LEFT_ROOM', rooms[`room-${roomId}`]);
	})

	function getUser(clientId) {
		return users[clientId];
	}

	function createGuestUser(clientId) {
		users[clientId] = {
			username: `guest${userNumber}`,
			id: clientId,
		};
		userNumber++
	}

	client.on('disconnect', () => {
		const { [client.id]: del, ...rest } = users;
		users = rest;
	})
});

server.listen(port, function () {
	console.log('Server listening at port %d', port);
});