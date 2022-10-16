import React, { useEffect, useState } from 'react';
import {
	useNavigate,
} from 'react-router-dom';

import LobbyList from '../components/lobby/lobby-list';
import { useSocket } from '../hooks/socket';

const LobbyListContainer = () => {
	const nav = useNavigate();
	const socket = useSocket();
	const [rooms, setRooms] = useState([]);

	useEffect(() => {
		if (socket) {
			socket.emit('GET_ROOMS')

			socket.on('GET_ROOMS_RES', (roomsRes: any) => {
				setRooms(roomsRes)
			})
			socket.on('ROOM_CREATED', (roomsRes: any) => {
				setRooms(roomsRes)
			})
			return () => {
				socket.off("GET_ROOMS_RES");
				socket.off("ROOM_CREATED");
			};
		}
	}, [socket])

	const $onPublicRoom = () => {
		socket.emit('GET_NEXT_ROOM_ID');
	}

	const $onPrivateRoom = () => {
		nav('/lobby/create');
	}

	return (
		<LobbyList
			rooms={rooms}
			onPublicRoom={$onPublicRoom}
			onPrivateRoom={$onPrivateRoom}
		/>
	);
}

export default LobbyListContainer;
