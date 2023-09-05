import React, { FC } from "react";
import './player.scss';
import { Card } from "../../card";
import { Card as CardType } from "../../../constants/types";
import { Button } from "../../interactions/button";

interface PlayerInterface {
    hand: Array<CardType>
    deck: Array<CardType>
    selectedCards: Array<CardType>
    onClickCard: Function
    playCards: Function
    hasPlayedCard: boolean
}

export const Player: FC<PlayerInterface> = ({
	hand,
	deck,
	selectedCards,
	onClickCard,
	playCards,
	hasPlayedCard
}) => {
	return <div className="player">
		{hand.map((card) => {
			return <Card
				key={card.id}
				card={card}
				onClick={() => onClickCard(card)}
				active={!hasPlayedCard}
				selectedCards={selectedCards}
			/>;
		})}
		{selectedCards.length > 0 && (
			<Button className="player__submit-move" onClick={playCards} text="play cards" />
		)}
	</div>;
};