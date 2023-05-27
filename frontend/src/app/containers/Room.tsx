import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Room from '../components/game/room/room';
import Game from '../components/game/game';
import { Room as RoomType, User as UserType } from '../constants/types';
import { useSocket } from '../hooks/socket';
import { PLAYER, OBSERVER, LOBBY_PHASE, DRAFT_PHASE, GAME_PHASE, SCORE_PHASE } from '../constants/backend';

const RoomContainer = () => {
	const params = useParams();
	const { roomId } = params;
	const socket = useSocket();
	const [room, setRoom] = useState(null);
	const [playerId, setPlayerId] = useState(null); // "you"

	useEffect(() => {
		if (socket) {
			socket.emit('JOIN_ROOM', roomId);
			socket.emit('WHO_AM_I');
			socket.on('JOINED_ROOM', (roomData: RoomType) => {
				setRoom(roomData);
			})
			socket.on('LEFT_ROOM', (roomData: RoomType) => {
				setRoom(roomData);
			})
			socket.on('YOU_ARE', (user: UserType) => {
				setPlayerId(user.id);
			})
			socket.on('GAME_STARTED', (roomData: RoomType) => {
				setRoom(roomData);
			});
			return () => {
				socket.removeAllListers();
				socket.emit('LEAVE_ROOM', { roomId });
			}
		}
	}, [socket]);

	const $startGame = () => {
		if (room.users.length === 1) {
			alert('loner!');
			return;
		}
		socket.emit('START_GAME', roomId)
	}


	if (!room) {
		return null;
	}

	if (room.state.phase === LOBBY_PHASE) {
		return (
			<Room
				room={room}
				startGame={$startGame}
				isHost={playerId === room?.host.id}
			/>
		);
	}

	if (room.state.phase === DRAFT_PHASE) {
		return (
			<Game
				room={room}
			/>
		)
	}

}

export default RoomContainer;
