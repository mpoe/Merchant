import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
	useLocation,
	useParams,
	useNavigate,
} from 'react-router-dom';

import { joinRoom, getClientID, leaveRoom } from '../api';

import Room from '../components/room';

const RoomContainer = () => {
	const params = useParams();
	const state = useSelector((state) => state);
	console.log('state', state);
	const { roomId } = params;

	const { room: { room } } = state;
	console.log('params', params);
	useEffect(() => {
		getClientID(); // On load of the app (first page!) - get the clientid from the backend
		joinRoom(roomId);

		return () => {
			/* leaveRoom(roomId, user.id); */
		}
	}, []);

	const $startGame = () => {
		alert('Not implemented :(');
	}

	return (
		<Room id={roomId} room={room} startGame={$startGame} />
	);
}

export default RoomContainer;
