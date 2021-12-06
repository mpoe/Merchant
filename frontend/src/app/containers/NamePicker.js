import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getClientID, setUserName } from '../api';
import NamePicker from '../components/namepicker';

const NamePickerContainer = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState('')

	useEffect(() => {
		getClientID(); // On load of the app (first page!) - get the clientid from the backend
	}, [])

	console.log(history);

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

NamePickerContainer.propTypes = {
	// history: PropTypes.shape({
	// 	push: PropTypes.func,
	// }).isRequired,
};

const mapStateToProps = state => ({
	state,
});

const mapDispatchToProps = dispatch => ({
	/* sendTheAlert: () => {dispatch(ALERT_ACTION)} */
});

export default connect(mapStateToProps, mapDispatchToProps)(NamePickerContainer);
