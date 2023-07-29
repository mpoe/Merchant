import React, { useEffect } from 'react';
import {
	useNavigate,
} from 'react-router-dom';

import { Lobby } from '../components/lobby';
import { Room } from '../constants/types';
import { useSocket } from '../hooks/socket';



const LobbyContainer = () => {
	const nav = useNavigate();
	const socket = useSocket();

	const $onLobby = () => {
		nav('/lobby/browse');
	}

	const $onPublicRoom = () => {
		socket.emit('CREATE_ROOM');
	}

	const $onPrivateRoom = () => {
		nav('/lobby/create');
	}

	useEffect(() => {
		if (socket) {
			socket.on('JOINED_ROOM', (room: Room) => {
				nav(`/room/${room.id}`)
			})

			return () => {
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
