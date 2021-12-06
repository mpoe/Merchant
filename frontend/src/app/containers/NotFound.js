import React from 'react';

import { getClientID } from '../api';
import NotFound from '../components/404';

class NotFoundContainer extends React.Component {
	componentDidMount() {
		getClientID(); // On load of the app (first page!) - get the clientid from the backend
	}

	render() {
		return (
			<NotFound />
		);
	}
}

NotFoundContainer.propTypes = {
};

export default NotFoundContainer;
