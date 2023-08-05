import React, { FC } from 'react';
import { Player } from '../components/game/player';

interface PlayerContainerInterface {
    horizontal?: boolean;
    vertical?: boolean;
    reverse?: boolean;
    render?: boolean;
}

export const PlayerContainer: FC<PlayerContainerInterface> = ({ render = true }) => {
    if (!render) {
        return null;
    }

    return <Player />
}