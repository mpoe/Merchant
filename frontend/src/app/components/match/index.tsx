import React, { FC, useState } from 'react';
import { Card, Room } from '../../constants/types';

import { Opponent } from './player/opponent';
import { Player } from './player';
import { Scoreboard } from './scoreboard';

import './match.scss';
import { Field } from '../field';
import { PlayArea } from './playArea';

interface MatchInterface {
    room?: Room;
    playerId: String;
    playCards: Function;
	showdown: boolean;
}

export const Match: FC<MatchInterface> = ({ room, playerId, playCards, showdown }) => {
	const player = room.state.players.find((player) => player.id === playerId);
	const opponents = room.state.players.filter((player) => player.id !== playerId);
	const customer = room.state.customers[room.state.round];
	const playedCards = room.state.playedCards;

	const [selectedCards, setSelectedCards] = useState([]);

	/**
	 * @param card 
	 */
	const $onClickCard = (card: Card) => {
		setSelectedCards([...selectedCards, card]);
	};

	const $playCards = () => {
		playCards(selectedCards);
		setSelectedCards([]);
	};

	return (
		<Field isGame room={room} users={room.users}>
			<div className='match__playing-field'>
				<Scoreboard />
				<PlayArea
					customer={customer}
					showdown={showdown}
					playedCards={playedCards}
					opponents={opponents}
				/>
				<Player
					hand={player.hand}
					deck={player.deck}
					selectedCards={selectedCards}
					onClickCard={$onClickCard}
					playCards={$playCards}
					hasPlayedCard={player.hasPlayedCard}
				/>
				{opponents.map((opponent, i) => (
					<Opponent
						hand={opponent.hand}
						key={opponent.id}
						i={i}
						hasPlayedCard={opponent.hasPlayedCard}
					/>)
				)}
			</div>
		</Field>
	);
};