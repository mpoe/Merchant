import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// import { getClientID, setUserName } from '../api';
import NamePicker from '../components/namepicker';
import { useSocket } from '../hooks/socket';

const NamePickerContainer = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState('')
	const socket = useSocket();

	const handleInput = (e: any) => {
		if (e.key === 'Enter') {
			submit(e);
		}
		setUsername(e.currentTarget.value);
	};

	const submit = (e: any) => {
		e.preventDefault();
		socket.emit('SET_USERNAME_REQ', username);
		// setUserName(username);
		navigate('/lobby');
	}

	return (
		<NamePicker
			submit={submit}
			handleInput={handleInput}
			username={username}
		/>
	);
}

export default NamePickerContainer;
