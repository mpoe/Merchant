// @ts-check
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");

// @ts-ignore
const io = new Server(server, {
	cors: {
		origin: "http://localhost:9000",
		methods: ["GET", "POST"]
	}
});

const port = 8000;

var fs = require('fs');


const dbcon = require('./db'); // connection to the database

const users = {};

const rooms = {};

let userNumber = 10000;
let roomId = 44444;

dbcon.connect((err) => {
	// console.log('connect');
}); // connect to the database, this will happen on server start.


io.on('connection', (client) => { // client === socket
	client.on('GET_ID_REQ', () => {
		console.log('get id ####');
		client.emit('GET_ID_RES', client.id);
	})

	client.on('SET_USERNAME_REQ', (username) => {
		console.log('username', username);
		// check if username exists
		users[client.id] = {
			...users[client.id],
			username,
			id: client.id,
		};

		console.log('users', users);

		client.emit('SET_USERNAME_RES', username);
	})

	client.on('CREATE_ROOM', ({ roomId, roomSettings }) => {
		client.join(`room-${roomId}`);
		rooms[`room-${roomId}`] = {
			...roomSettings,
			id: roomId,
			users: [],
		}
		client.emit('JOINED_ROOM', rooms[`room-${roomId}`])
	})

	client.on('GET_ROOMS', () => {
		client.emit('GOT_ROOMS', rooms);
	})

	client.on('GET_NEXT_ROOM_ID', (roomInfo) => {
		client.emit('GET_NEXT_ROOM_ID_RES', roomId, roomInfo);
		roomId++;
	})

	client.on('JOIN_ROOM', (roomId) => {
		client.join(`room-${roomId}`);
		rooms[`room-${roomId}`] = {
			...rooms[`room-${roomId}`],
			users: (rooms[`room-${roomId}`] ? [...rooms[`room-${roomId}`].users, getUser(client.id)] : [getUser(client.id)]),
		}
		client.emit('JOINED_ROOM', rooms[`room-${roomId}`])
		client.to(`room-${roomId}`).emit('JOINED_ROOM', rooms[`room-${roomId}`]);
	})

	client.on('LEAVE_ROOM', (roomInfo) => {
		console.log(roomInfo);
		console.log(rooms);
	})

	function getUser(clientId) {
		console.log('users', users);
		return users[clientId];
	}

	client.on('disconnect', (test) => { //event listener
		console.log('client.id', client.id);
		console.log('ABD');
	})

	client.on('disconnecting', (test) => { //event listener
		//console.log('DISCONNECT');
	})
});

server.listen(port, function () {
	console.log('Server listening at port %d', port);
	//fs.writeFile(__dirname + '/start.log', 'started', (error) => { console.log(error) });
});