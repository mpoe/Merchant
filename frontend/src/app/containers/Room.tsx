import React, { useEffect, FC } from 'react';
import {
	useLocation,
	useParams,
	useNavigate,
} from 'react-router-dom';

// import { joinRoom, getClientID, leaveRoom } from '../api';
import { User } from '../constants/types';

import Room from '../components/room';

interface RoomContainerInterface { }

const RoomContainer: FC<RoomContainerInterface> = () => {
	const params = useParams();
	const { roomId } = params;

	useEffect(() => {
		// getClientID(); // On load of the app (first page!) - get the clientid from the backend
		// joinRoom(roomId);

		return () => {
			/* leaveRoom(roomId, user.id); */
		}
	}, []);

	const $startGame = () => {
		alert('Not implemented :(');
	}

	const users: Array<User> = [];

	const room = {
		name: 'test',
		users,
		password: '',
		host: 'tetete',
	}

	return (
		<Room id={roomId} room={room} startGame={$startGame} />
	);
}

export default RoomContainer;
