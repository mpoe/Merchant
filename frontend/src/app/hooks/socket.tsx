import { useContext } from "react";

import SocketContext from '../contexts/socket';

const useSocket = () => {
	const socket = useContext(SocketContext);

	return socket;
};

export { useSocket };
