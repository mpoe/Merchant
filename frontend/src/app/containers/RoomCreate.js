import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { PROPTYPE_HISTORY } from '../constants/proptypes';
import { createRoomRequest } from '../api';

import RoomCreate from '../components/roomCreate';

const RoomCreateContainer = () => {
	const [password, setPassword] = useState('');
	const [roomName, setRoomName] = useState('');

	const nav = useNavigate();

	const $onChangePassword = (e) => {
		setPassword(e.target.value);
	}

	const $onCreateRoom = () => {
		createRoomRequest({ host: id, password, name: roomName });
	}

	const $onChangeRoomName = (e) => {
		this.setState({
			roomName: e.target.value,
		});
	}

	const $onCancel = () => {
		nav('/lobby');
	}

	return (
		<RoomCreate
			password={password}
			roomName={roomName}
			handlePassword={$onChangePassword}
			handleRoomName={$onChangeRoomName}
			handleCreate={$onCreateRoom}
			handleCancel={$onCancel}
		/>
	);
}

export default RoomCreateContainer;
