import React, { createContext, useEffect, useState, FC } from 'react';
import openSocket from 'socket.io-client';

const SocketContext = createContext(null);

interface SocketProviderInterface {
    children: React.ReactNode;
}

const SocketProvider: FC<SocketProviderInterface> = ({ children }) => {
    const [Socket, setSocket] = useState(null);
    const socket = openSocket('http://localhost:8000');
    socket.on('connect', () => {
        if (Socket) {
            return null;
        }
        return setSocket(socket);
    })

    return <SocketContext.Provider value={Socket}>{children}</SocketContext.Provider>;
}

export default SocketContext;
export { SocketProvider }
