import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { NamePicker } from '../components/namepicker';
import { useSocket } from '../hooks/socket';

export const NamePickerContainer = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState('mpoe')
	const socket = useSocket();

	const handleInput = (e: any) => {
		if (e.key === 'Enter') {
			submit(e);
		}
		setUsername(e.currentTarget.value);
	};

	const submit = (e: any) => {
		e.preventDefault();
		if (username.length === 0) {
			return alert('must input username')
		}
		socket.emit('SET_USERNAME_REQ', username);
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
