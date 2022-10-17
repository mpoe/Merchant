import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Room from '../components/game/room/room';
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
			return () => {
				socket.off("JOINED_ROOM");
				socket.emit('LEAVE_ROOM', { roomId });
			}
		}
	}, [socket]);

	const $startGame = () => {
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
