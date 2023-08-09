import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Room } from '../components/lobby/room';
import { Room as RoomType, User as UserType, GamePhase } from '../constants/types';
import { useSocket } from '../hooks/socket';
import { MerchantContainer } from './Merchant';

export const RoomContainer = () => {
	const params = useParams();
	const { roomId } = params;
	const socket = useSocket();
	const [room, setRoom] = useState(null);
	const [playerId, setPlayerId] = useState(null); // "you"
	const nav = useNavigate();

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
				socket.removeAllListeners();
				socket.emit('LEAVE_ROOM', roomId);
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

	const $goToBrowse = () => {
		nav('/lobby/browse');
	}


	if (!room) {
		return null;
	}

	if (room.state.phase === GamePhase.LOBBY_PHASE) {
		return (
			<Room
				room={room}
				startGame={$startGame}
				isHost={playerId === room?.host.id}
				goToBrowse={$goToBrowse}
			/>
		);
	}

	if (room.state.phase !== GamePhase.LOBBY_PHASE) {
		return (
			<MerchantContainer roomData={room} />
		)
	}

}
