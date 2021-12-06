import React from 'react';
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

export default NamePickerContainer;
