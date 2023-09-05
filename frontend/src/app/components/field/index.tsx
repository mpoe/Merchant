import React, { FC } from 'react';

import { Background } from '../background';
import playmat from '../../../../assets/bg-playmat.svg';
import gamemat from '../../../../assets/bg-game.svg';

import './field.scss';
import { User, Room } from '../../constants/types';
import classNames from 'classnames';

interface FieldInterface {
    children: React.ReactNode;
    users: Array<User>;
    room: Room;
	isGame?: boolean;
}


export const Field: FC<FieldInterface> = ({ children, users, room, isGame }) => {
	return (
		<Background src={gamemat} className="playing-field__mat">
			<div className={classNames('playing-field', { 'playing-field--game': isGame})}>
				<Background className="playing-field playing-field__bg" src={playmat}>
					{children}
				</Background>
			</div>
		</Background>
	);
};
