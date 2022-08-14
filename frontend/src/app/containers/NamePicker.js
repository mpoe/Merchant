import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { getClientID, setUserName } from '../api';
import NamePicker from '../components/namepicker';

const NamePickerContainer = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState('')

	useEffect(() => {
		getClientID();
	}, [])

	const handleInput = (e) => {
		if (e.key === 'Enter') {
			this.submit(e);
		}
		setUsername(e.target.value);
	};

	const submit = (e) => {
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
