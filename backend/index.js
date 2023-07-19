const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require('path')
const fs = require('fs');

const data = require('./data.json');

const { customers, cards } = data;

const currentPath = path.join(__dirname);
const basePath = currentPath + '/.env';
const envPath = basePath + '.' + process.env.env;
const finalPath = fs.existsSync(envPath) ? envPath : basePath;

const fileEnv = require('dotenv').config({ path: finalPath }).parsed;

const io = new Server(server, {
	cors: {
		origin: fileEnv.SOCKET_SOURCE, // make sure that this point to external ip when hosting site
		methods: ["GET", "POST"]
	}
});

const port = 80;

// const dbcon = require('./db'); // connection to the database

const debug = true;

// update frontend constants if adding here.
const PLAYER = 'player';
const OBSERVER = 'observer';
const LOBBY_PHASE = 'lobby';
const DRAFT_PHASE = 'draft';
const GAME_PHASE = 'game';
const SCORE_PHASE = 'score';
// update frontend constants if adding here.


let users = {};

let rooms = {};

let userNumber = 10000;
let roomId = 44444;

const LOBBY_STATE = {
	phase: LOBBY_PHASE,
	score: null, // set after draft
	round: null, // set after draft
	deck: null,
	playerDecks: null,
	playerHands: null,
	playerDiscards: null, // do we want/need this?
	playerStatus: null,
	customers: [],
}

/* dbcon.connect((err) => {
}); // connect to the database, this will happen on server start. */


/****** Useful stuff ******/
// const clients = io.sockets.adapter.rooms.get(`room-${roomId}`);


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

	client.on('WHO_AM_I', () => {
		client.emit('YOU_ARE', getUser(client.id))
	})

	client.on('CREATE_ROOM', ({ roomSettings }) => {
		roomId++;
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
			host: users[client.id],
			state: LOBBY_STATE,
		}
		client.emit('JOINED_ROOM', rooms[`room-${roomId}`])
	})

	client.on('GET_ROOMS', () => {
		client.emit('GET_ROOMS_RES', rooms);
	})

	client.on('JOIN_ROOM', (roomId) => {
		if (!getUser(client.id)) {
			createGuestUser(client.id);
		}

		client.join(`room-${roomId}`);

		rooms[`room-${roomId}`] = {
			...rooms[`room-${roomId}`],
			users: [...rooms[`room-${roomId}`]?.users, getPlayerUser(client.id)],
		}

		client.emit('JOINED_ROOM', rooms[`room-${roomId}`])

		client.to(`room-${roomId}`).emit('JOINED_ROOM', rooms[`room-${roomId}`]); // notify the socket room
		io.emit('ROOM_CREATED', rooms); // notify all users
	})

	client.on('LEAVE_ROOM', (roomId) => {
		const room = rooms[`room-${roomId}`];
		if (room) {
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
			io.emit('ROOM_UPDATED', rooms); // notify all users
			client.leave(`room-${roomId}`);
			io.to(`room-${roomId}`).emit('LEFT_ROOM', rooms[`room-${roomId}`]);
		}
	})

	client.on('START_GAME', (roomId) => {
		rooms = {
			...rooms,
			[`room-${roomId}`]: {
				...rooms[`room-${roomId}`],
				state: {
					...rooms[`room-${roomId}`]?.state,
					phase: DRAFT_PHASE,
				},
			},
		}
		io.to(`room-${roomId}`).emit('GAME_STARTED', rooms[`room-${roomId}`]);
	})

	client.on('DRAFT_CARD', ({ id, roomId }) => {
		console.log('roomId', roomId);
		console.log('id', id);
		rooms = {
			...rooms,
			[`room-${roomId}`]: {
				...rooms[`room-${roomId}`],
				state: {
					...rooms[`room-${roomId}`].state,
					draftpool: rooms[`room-${roomId}`].state.draftpool.filter((card) => card.id !== id)
				},
			},
		}
		client.emit('CARD_DRAFTED', rooms[`room-${roomId}`])
		io.to(`room-${roomId}`).emit('CARD_DRAFTED', rooms[`room-${roomId}`]);
		io.emit('GAME_STATE', { rooms, users })
	})

	function getUser(clientId) {
		return users[clientId];
	}

	function getPlayerUser(clientId) {
		return {
			...getUser(clientId),
			status: PLAYER,
			score: null,
			hasPlayedCard: false,
			deck: [],
			hand: [],
		};
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

	// debug related

	const createSeedBot = () => {
		userNumber++;
		return {
			id: `bot-${userNumber}`,
			score: null,
			status: 'bot',
			username: `bot-${userNumber}`,
			hasPlayedCard: false,
			deck: [],
			hand: [],
		};
	}

	client.on('SEED_DRAFT', () => {
		const botUser1 = createSeedBot();
		users[client.id] = {
			...users[client.id],
			username: 'mpoe_test',
			id: client.id,
		};
		rooms = {
			...rooms,
			[`room-1`]: {
				password: '', // public info
				name: `room-1`, // public info
				id: 1, // public info
				users: [botUser1, getUser(client.id)], // public info
				host: users[client.id], // public info
				state: {
					phase: DRAFT_PHASE,
					round: null, // set after draft
					cardpool: cards,
					draftpool: cards,
					customers: customers,
					players: [botUser1, getPlayerUser(client.id)],
				}
			},
		};
		client.emit('DRAFT_SEEDED', rooms[`room-1`])
		io.emit('GAME_STATE', { rooms, users })

	})

	client.on('SEED_GAME', () => {
		users[client.id] = {
			...users[client.id],
			username: 'mpoe_test',
			id: client.id,
		};
		rooms = {
			...rooms,
			[`room-1`]: {
				password: '',
				name: `room-1`,
				id: 1,
				users: [createSeedBot(), getPlayerUser(client.id)],
				host: users[client.id],
				state: {
					phase: DRAFT_PHASE,
					round: null, // set after draft
					cardpool: cards,
					draftpool: cards,
					customers: customers,
				}
			},
		};
		client.emit('GAME_SEEDED', rooms[`room-1`])
		io.emit('GAME_STATE', { rooms, users })
	})
});

server.listen(port, function () {
	console.log('Server listening at port', port);
});

const ROOT_PATH = path.resolve(__dirname, '..');
const HTML_PATH = path.join(ROOT_PATH, '/dist/index.html');
const DIST_PATH = path.join(ROOT_PATH, '/dist');

app.use(express.static(DIST_PATH))

app.get('*', (req, res) => {
	res.sendFile(HTML_PATH);
})