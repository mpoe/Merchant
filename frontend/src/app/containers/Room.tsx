import React, { useEffect, FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Room from '../components/game/room/room';
import { useSocket } from '../hooks/socket';

interface RoomContainerInterface { }

const RoomContainer: FC<RoomContainerInterface> = () => {
	const params = useParams();
	const { roomId } = params;
	const socket = useSocket();
	const [room, setRoom] = useState(null);
	const nav = useNavigate();

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

	const $goToLobby = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		nav('../lobby/browse');
	};

	return (
		<Room
			room={room}
			startGame={$startGame}
			goToLobby={$goToLobby}
		/>
	);
}

export default RoomContainer;
