import React, { FC } from 'react';

import './playarea.scss';
import { Card } from '../../card';
import { Card as CardType, Player } from '../../../constants/types';
import { Opponent } from '../player/opponent';

interface PlayAreaInterface {
	showdown: boolean;
	customer: CardType;
	playedCards: Array<CardType>
	opponents: Array<Player>
}

export const PlayArea: FC<PlayAreaInterface> = ({ customer, showdown, playedCards, opponents }) => {
	return <div className='playarea'>
		<Card
			onClick={null}
			card={customer}
			active
		/>
	</div>;
};