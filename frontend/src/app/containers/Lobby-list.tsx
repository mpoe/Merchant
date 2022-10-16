import React, { useEffect } from 'react';
import {
	useNavigate,
} from 'react-router-dom';

import LobbyList from '../components/lobby/lobby-list';
import { useSocket } from '../hooks/socket';

const LobbyListContainer = () => {
	const nav = useNavigate();
	const socket = useSocket();

	useEffect(() => {
		// getRooms();
	}, [])

	const $onPublicRoom = () => {
		socket.emit('GET_NEXT_ROOM_ID');
	}

	const $onPrivateRoom = () => {
		nav('/lobby/create');
	}

	return (
		<LobbyList
			rooms={{ "abc": { id: 'a', name: 'a', users: [] } }}
			onPublicRoom={$onPublicRoom}
			onPrivateRoom={$onPrivateRoom}
		/>
	);
}

export default LobbyListContainer;
