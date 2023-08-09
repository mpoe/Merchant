import React, { FC } from 'react';
import { Background } from '../components/background';
import { Match } from '../components/match';
import { Room } from '../constants/types';

interface MatchContainerInterface {
    room: Room;
}

export const MatchContainer: FC<MatchContainerInterface> = ({ room }) => {
    return (
        <Background>
            {room && (
                <Match room={room} />
            )}
        </Background>
    )
}