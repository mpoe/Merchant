import React, { FC } from 'react';
import { Room } from '../../constants/types';

import { Background } from '../background';

interface GameInterface {
    room?: Room;
}

const Game: FC<GameInterface> = ({ room }) => {
    return (
        <Background>
            <div style={{ width: '1000px' }}></div>
            <h1>Hi</h1>
        </Background>
    );
}

export default Game;
