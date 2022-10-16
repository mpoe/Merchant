import React, { useEffect, FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import Room from '../components/game/room/room';
import { useSocket } from '../hooks/socket';

interface RoomContainerInterface { }

const RoomContainer: FC<RoomContainerInterface> = () => {
	const params = useParams();
	const { roomId } = params;
	const socket = useSocket();
	const [room, setRoom] = useState(null);

	useEffect(() => {
		if (socket) {
			socket.emit('JOIN_ROOM', roomId);
		}

		return () => {
			if (socket) {
				socket.emit('LEAVE_ROOM', { roomId });
			}
		}
	}, [socket]);

	if (socket) {
		socket.on('JOINED_ROOM', (data: any) => {
			setRoom(data);
		})
	}

	const $startGame = () => {
		alert('Not implemented :(');
	}

	return (
		<Room room={room} startGame={$startGame} />
	);
}

export default RoomContainer;
