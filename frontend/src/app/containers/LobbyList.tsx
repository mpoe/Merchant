import React, { useEffect } from 'react';
import {
	useLocation,
	useParams,
	useNavigate,
} from 'react-router-dom';

import { getClientID, createRoomRequest, getRooms } from '../api';
import LobbyList from '../components/lobbyList';

const LobbyListContainer = () => {
	const nav = useNavigate();
	useEffect(() => {
		// getRooms();
	}, [])

	const $onPublicRoom = () => { // needs callback on creation
		createRoomRequest({ host: 'tetetetete', password: '', name: `<Someone>'s room` });
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
