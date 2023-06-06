import React, { useEffect, useState } from 'react';
import Draft from '../components/game/draft';
import { Room } from '../constants/types';
import { useSocket } from '../hooks/socket';

const DraftContainer = () => {
    const socket = useSocket();
    const [room, setRoom] = useState(null);

    useEffect(() => {
        if (socket) {
            socket.on('DRAFT_SEEDED', (room: Room) => {
                setRoom(room);
            });
            socket.on('CARD_DRAFTED', (room: Room) => {
                setRoom(room);
            })
            return () => {
                socket.removeAllListers();
            }
        }
    }, [socket])

    const $onClickCard = (id: number) => {
        socket.emit('DRAFT_CARD', { id, roomId: room.id })
    }

    return room && (
        <Draft room={room} onClickCard={$onClickCard} />
    )
}

export default DraftContainer;