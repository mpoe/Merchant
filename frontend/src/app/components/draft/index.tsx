import React, { FC } from 'react';
import { Card as CardType, Room } from '../../constants/types';

import './draft.scss';
import { Card } from '../card';
import { Field } from '../field';

interface DraftInterface {
	room: Room;
	onClickCard(id: number): any;
	isActivePlayer: boolean;
}

export const Draft: FC<DraftInterface> = ({ room, onClickCard, isActivePlayer }) => {
	return (
		<Field room={room} users={room.users}>
			<div className="draft-field">
				{room.state.draftpool.map((card: CardType) => {
					return <Card active={isActivePlayer} key={card.id} card={card} onClick={onClickCard} state="draft" />;
				})}
			</div>
		</Field>
	);
};
