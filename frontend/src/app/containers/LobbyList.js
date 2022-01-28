import React, { useEffect } from 'react';
import {
	useLocation,
	useParams,
	useNavigate,
} from 'react-router-dom';

import { /* getClientID */ createRoomRequest, getRooms } from '../api';
import LobbyList from '../components/lobbyList';

const LobbyListContainer = (props) => {
	console.log('props', props);
	const nav = useNavigate();
	useEffect(() => {
		// getRooms();
	}, [])

	const $onPublicRoom = () => { // needs callback on creation
		const { state: { user: { id, username } } } = this.props;
		createRoomRequest({ host: id, password: '', name: `${username}'s room` });
	}

	const $onPrivateRoom = () => {
		nav('/lobby/create');
	}

	// const { state: { room: { rooms } } } = this.props;
	return (
		<LobbyList
			rooms={{ "abc": { id: 'a', name: 'a', users: [] } }}
			onPublicRoom={$onPublicRoom}
			onPrivateRoom={$onPrivateRoom}
		/>
	);
}

LobbyListContainer.propTypes = {
};

export default LobbyListContainer;
