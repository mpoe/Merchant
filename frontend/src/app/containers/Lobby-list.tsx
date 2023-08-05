import React, { useEffect, useState } from 'react';
import {
	useNavigate,
} from 'react-router-dom';

import { LobbyList } from '../components/lobby/list';
import { Room } from '../constants/types';
import { useSocket } from '../hooks/socket';

export const LobbyListContainer = () => {
	const nav = useNavigate();
	const socket = useSocket();
	const [rooms, setRooms] = useState({});

	useEffect(() => {
		if (socket) {
			socket.emit('GET_ROOMS');

			socket.on('GET_ROOMS_RES', (roomsRes: Object) => {
				setRooms(roomsRes);
			});

			socket.on('ROOM_CREATED', (roomsRes: Object) => {
				setRooms(roomsRes);
			});

			socket.on('ROOM_UPDATED', (roomsRes: Object) => {
				setRooms(roomsRes);
			})

			socket.on('JOINED_ROOM', (room: Room) => {
				nav(`/room/${room.id}`)
			})

			socket.on('ROOM_REMOVED', (roomsRes: Object) => {
				setRooms(roomsRes);
			})

			return () => {
				socket.off("GET_ROOMS_RES");
				socket.off("ROOM_CREATED");
				socket.off("ROOM_UPDATED");
				socket.off("JOINED_ROOM");
				socket.off("ROOM_REMOVED");
			};
		}
	}, [socket])

	const $onPublicRoom = () => {
		socket.emit('CREATE_ROOM');
	}

	const $onPrivateRoom = () => {
		nav('/lobby/create');
	}

	const $onClickRoom = (e: React.MouseEvent<HTMLAnchorElement>, room: Room) => {
		if (room.password !== '') {
			let psw = window.prompt('Enter password');
			if (!(psw === room.password)) {
				e.preventDefault();
			}
		} else if (room.users.length > 4) {
			e.preventDefault();
		}
	}

	return (
		<LobbyList
			rooms={rooms}
			onPublicRoom={$onPublicRoom}
			onPrivateRoom={$onPrivateRoom}
			onClickRoom={$onClickRoom}
		/>
	);
}
