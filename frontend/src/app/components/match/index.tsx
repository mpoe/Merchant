import React, { FC } from 'react';
import { Room } from '../../constants/types';

import { Background } from '../background';
import { Opponent } from './player/opponent';
import { Player } from './player';
import { Scoreboard } from './scoreboard';

import matchBg from '../../../../assets/bg-game.svg';

import './match.scss';

interface MatchInterface {
    room?: Room;
}

export const Match: FC<MatchInterface> = ({ room }) => {
    // room.players.length - 1
    const player = {
        id: 1,
        username: 'test',
        status: 'test',
        score: 0,
        hasPlayedCard: false,
        deck: [] as any,
        hand: [] as any,
    }

    const opponents = [player, { ...player, id: 2 }, { ...player, id: 3 }, { ...player, id: 4 }]

    return (
        <Background src={matchBg}>
            <div className='match__playing-field'>
                <Scoreboard />
                <Player />
                {opponents.map((opponent, i) => <Opponent key={opponent.id} i={i} />)}
            </div>
        </Background>
    );
}