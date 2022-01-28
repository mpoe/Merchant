import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
	useLocation,
	useParams,
	useNavigate,
} from 'react-router-dom';

import { PROPTYPE_HISTORY } from '../constants/proptypes';
import { getClientID, createRoomRequest } from '../api';
import Lobby from '../components/lobby';
import RequireName from '../hoc/requireName';

const LobbyContainer = () => {
	const location = useLocation();
	const params = useParams();
	const nav = useNavigate();

	const state = useSelector((state) => state);
	console.log('state', state);

	useEffect(() => {
		getClientID(); // On load of the app (first page!) - get the clientid from the backend
	}, [])

	useEffect(() => {
		console.log('state', state);
		console.log('###');
		if (state.room.room.id) {
			nav(`/room/${state.room.room.id}`);
		}
	}, [state.room.room])

	const $onLobby = () => {
		nav('/lobby/browse');
	}

	const $onPublicRoom = () => {
		const { user: { id, username } } = state;
		createRoomRequest({ host: id, password: '', name: `${username}'s room` });
	}

	const $onPrivateRoom = () => {
		nav('/lobby/create');
	}

	return (
		<Lobby
			onPublicRoom={$onPublicRoom}
			onPrivateRoom={$onPrivateRoom}
			onLobby={$onLobby}
		/>
	);
}

export default LobbyContainer;
