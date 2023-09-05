import React, { createContext, useState, FC } from 'react';
import openSocket from 'socket.io-client';

const SocketContext = createContext(null);

interface SocketProviderInterface {
    children: React.ReactNode;
}
declare const SOCKET_URL: string;

const SocketProvider: FC<SocketProviderInterface> = ({ children }) => {
	const [Socket, setSocket] = useState(null);
	const socket = openSocket(SOCKET_URL);
	socket.on('connect', () => {
		if (Socket) {
			return null;
		}
		return setSocket(socket);
	});

	return <SocketContext.Provider value={Socket}>{children}</SocketContext.Provider>;
};

export default SocketContext;
export { SocketProvider };
