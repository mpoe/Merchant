import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import { createRoomRequest } from '../api';

import RoomCreate from '../components/roomCreate';

const RoomCreateContainer = () => {
	const [password, setPassword] = useState('');
	const [roomName, setRoomName] = useState('');

	const nav = useNavigate();

	const $onChangePassword = (e: any) => {
		setPassword(e.target.value);
	}

	const $onCreateRoom = () => {
		// createRoomRequest({ host: 'testttestetest', password, name: roomName });
	}

	const $onChangeRoomName = (e: any) => {
		setRoomName(e.target.value)
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
