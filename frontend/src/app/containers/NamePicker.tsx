import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { getClientID, setUserName } from '../api';
import NamePicker from '../components/namepicker';

const NamePickerContainer = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState('')
	console.log('username', username);

	useEffect(() => {
		getClientID();
	}, [])

	const handleInput = (e: any) => {
		console.log('e', e);
		if (e.key === 'Enter') {
			submit(e);
		}
		setUsername(e.currentTarget.value);
	};

	const submit = (e: any) => {
		e.preventDefault();
		setUserName(username);
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
