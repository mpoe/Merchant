import React, { useEffect, useState } from 'react';
import { Background } from '../components/background';
import { Game } from '../components/game';
import { Room } from '../constants/types';
import { useSocket } from '../hooks/socket';

export const GameContainer = () => {
    const socket = useSocket();
    const [room, setRoom] = useState(null);

    useEffect(() => {
        if (socket) {
            socket.on('GAME_SEEDED', (room: Room) => {
                setRoom(room);
            });
            return () => {
                socket.removeAllListeners();
            }
        }
    }, [socket])

    return (
        <Background>
            {room && (
                <Game room={room} />
            )}
        </Background>
    )
}