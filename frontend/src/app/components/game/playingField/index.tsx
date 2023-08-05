import React, { FC } from 'react'

import { Background } from '../../background';
import playmat from '../../../../assets/bg-playmat.svg';
import gamemat from '../../../../assets/bg-game.svg';

import './playing-field.scss';
import { User, Room } from '../../../constants/types';
// import { PlayerContainer } from '../../../containers/Player';

interface PlayingFieldInterface {
    children: React.ReactNode;
    users: Array<User>;
    room: Room;
}


export const PlayingField: FC<PlayingFieldInterface> = ({ children, users, room }) => {
    console.log('users', users);
    console.log('room', room);
    return (
        <Background src={gamemat} className="playing-field__mat">
            <div className='playing-field'>
                <Background className="playing-field playing-field__bg" src={playmat}>
                    <div className="playing-field__container">
                        {children}
                    </div>
                </Background>
            </div>
        </Background>
    );
};
