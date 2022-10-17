import React, { useEffect, useState } from 'react';
import {
	useNavigate,
} from 'react-router-dom';

import LobbyList from '../components/lobby/lobby-list';
import { Room } from '../constants/types';
import { useSocket } from '../hooks/socket';

const LobbyListContainer = () => {
	const nav = useNavigate();
	const socket = useSocket();
	const [rooms, setRooms] = useState({});

	useEffect(() => {
		if (socket) {
			socket.emit('GET_ROOMS');

			socket.on('GET_ROOMS_RES', (roomsRes: any) => {
				console.log('roomsRes GET', roomsRes);
				setRooms(roomsRes);
			});

			socket.on('ROOM_CREATED', (roomsRes: any) => {
				console.log('roomsRes CREATED', roomsRes);
				setRooms(roomsRes);
			});

			socket.on('GET_NEXT_ROOM_ID_RES', (res: { roomId: string; roomInfo: Object; }) => {
				const { roomId, roomInfo } = res;
				console.log('GET_NEXT_ROOM_ID_RES');

				socket.emit('CREATE_ROOM', { roomId, roomSettings: roomInfo });
			});

			socket.on('JOINED_ROOM', (room: Room) => {
				nav(`/room/${room.id}`)
			})

			return () => {
				socket.off("GET_ROOMS_RES");
				socket.off("ROOM_CREATED");
				socket.off("GET_NEXT_ROOM_ID_RES");
				socket.off("JOINED_ROOM");
			};
		}
	}, [socket])

	const $onPublicRoom = () => {
		socket.emit('GET_NEXT_ROOM_ID');
	}

	const $onPrivateRoom = () => {
		nav('/lobby/create');
	}

	console.log('rooms', rooms);

	return (
		<LobbyList
			rooms={rooms}
			onPublicRoom={$onPublicRoom}
			onPrivateRoom={$onPrivateRoom}
		/>
	);
}

export default LobbyListContainer;
