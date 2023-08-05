import React, { FC } from 'react'
import { Card as CardType, Room } from '../../../constants/types';
import { PlayingField } from '../playingField';

import './draft.scss';
import { Card } from '../card';

interface DraftInterface {
	room?: Room;
	onClickCard(id: number): any;
}

export const Draft: FC<DraftInterface> = ({ room, onClickCard }) => {
	return (
		<PlayingField room={room} users={room.users}>
			<div className="draft-field">
				{room.state.draftpool.map((card: CardType) => {
					return <Card key={card.id} card={card} onClick={onClickCard} />
				})}
			</div>
		</PlayingField>
	);
};
