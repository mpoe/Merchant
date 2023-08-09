import React, { FC } from 'react'

import { Background } from '../background';
import playmat from '../../../../assets/bg-playmat.svg';
import gamemat from '../../../../assets/bg-game.svg';

import './field.scss';
import { User, Room } from '../../constants/types';

interface DraftFieldInterface {
    children: React.ReactNode;
    users: Array<User>;
    room: Room;
}


export const DraftField: FC<DraftFieldInterface> = ({ children, users, room }) => {
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
