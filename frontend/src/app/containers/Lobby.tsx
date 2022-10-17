import React, { useEffect } from 'react';
import {
	useNavigate,
} from 'react-router-dom';

import Lobby from '../components/lobby/lobby';
import { Room } from '../constants/types';
import { useSocket } from '../hooks/socket';



const LobbyContainer = () => {
	const nav = useNavigate();
	const socket = useSocket();

	const $onLobby = () => {
		nav('/lobby/browse');
	}

	const $onPublicRoom = () => {
		socket.emit('GET_NEXT_ROOM_ID');
	}

	const $onPrivateRoom = () => {
		nav('/lobby/create');
	}

	useEffect(() => {
		if (socket) {
			socket.on('GET_NEXT_ROOM_ID_RES', (res: { roomId: string; roomInfo: Object; }) => {
				const { roomId, roomInfo } = res;
				socket.emit('CREATE_ROOM', { roomId, roomSettings: roomInfo });
			});

			socket.on('JOINED_ROOM', (room: Room) => {
				nav(`/room/${room.id}`)
			})

			return () => {
				socket.off("GET_NEXT_ROOM_ID_RES");
				socket.off("JOINED_ROOM");
			};
		}
	}, [socket])

	return (
		<Lobby
			onPublicRoom={$onPublicRoom}
			onPrivateRoom={$onPrivateRoom}
			onLobby={$onLobby}
		/>
	);
}

export default LobbyContainer;
