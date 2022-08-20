import React, { useEffect } from 'react';

// import { getClientID } from '../api';
import NotFound from '../components/404';

const NotFoundContainer = () => {
	useEffect(() => {
		// getClientID(); // On load of the app (first page!) - get the clientid from the backend
	})

	return (
		<NotFound />
	);
}

export default NotFoundContainer;
