import React, { FC } from "react";
import './opponent.scss';
import classNames from "classnames";
import { Card, CardStyle } from "../../card";
import { Card as CardType } from "../../../constants/types";

interface OpponentInterface {
    i: number
    hand: Array<CardType>
	hasPlayedCard: boolean
}

export const Opponent: FC<OpponentInterface> = ({ i, hand, hasPlayedCard }) => {
	return (
		<div
			className={classNames('opponent', `opponent-${i}`)}
		>
			<div className={classNames({
				'opponent__is-thinking': !hasPlayedCard,
			})}></div>
			<div className="opponent__card-container">
				{hand.map((card) => {
					return <Card
						key={card.id}
						card={card}
						onClick={() => { }}
						active={false}
						isOpponent
						style={CardStyle.SMALL}
					/>;
				})}
			</div>
		</div>
	);
};