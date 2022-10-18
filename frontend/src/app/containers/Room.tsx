import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Room from '../components/game/room/room';
import { Room as RoomType } from '../constants/types';
import { useSocket } from '../hooks/socket';

const RoomContainer = () => {
	const params = useParams();
	const { roomId } = params;
	const socket = useSocket();
	const [room, setRoom] = useState(null);

	useEffect(() => { // test
		if (socket) {
			socket.emit('JOIN_ROOM', roomId);
			socket.on('JOINED_ROOM', (data: any) => {
				setRoom(data);
			})
			socket.on('LEFT_ROOM', (roomData: RoomType) => {
				setRoom(roomData);
			})
			return () => {
				socket.off("JOINED_ROOM");
				socket.emit('LEAVE_ROOM', { roomId });
				socket.off('LEFT_ROOM');
			}
		}
	}, [socket]);

	const $startGame = () => {
		if (room.users.length === 1) {
			alert('loner!');
			return;
		}
		alert('Not implemented :(');
	}

	return (
		<Room
			room={room}
			startGame={$startGame}
		/>
	);
}

export default RoomContainer;
