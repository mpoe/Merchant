import React, { useEffect, FC } from 'react';
import {
	useLocation,
	useParams,
	useNavigate,
} from 'react-router-dom';

import { getClientID, createRoomRequest } from '../api';
import Lobby from '../components/lobby';

const LobbyContainer = () => {
	// const location = useLocation();
	// const params = useParams();
	const nav = useNavigate();

	useEffect(() => {
		getClientID(); // On load of the app (first page!) - get the clientid from the backend
	}, [])

	const $onLobby = () => {
		nav('/lobby/browse');
	}

	// const $onPublicRoom = () => {
	// 	const { user: { id, username } } = state;
	// 	createRoomRequest({ host: id, password: '', name: `${username}'s room` });
	// }

	const $onPrivateRoom = () => {
		nav('/lobby/create');
	}

	return (
		<Lobby
			// onPublicRoom={$onPublicRoom}
			onPrivateRoom={$onPrivateRoom}
			onLobby={$onLobby}
		/>
	);
}

export default LobbyContainer;
