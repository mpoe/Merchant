import React, { FC } from "react";

import { Card as CardType } from '../../constants/types';

import cardFront from '../../../../assets/card-front.svg';
import cardBack from '../../../../assets/card-back.png';
import coins from '../../../../assets/icon-money.png';
import asset from '../../../../assets/customer-miss-carrot.png';

import './card.scss';
import classNames from "classnames";

export enum CardStyle {
	DEFAULT = "",
	SMALL = "card--small",
}

interface CardInterface {
	card: CardType;
	onClick(id: number): any;
	active: boolean;
	isOpponent?: boolean;
	state?: String;
	style?: CardStyle;
	isPublic?: boolean;
	selectedCards?: Array<CardType>;
}

export const Card: FC<CardInterface> = ({
	card,
	onClick,
	active,
	state = "game",
	isOpponent = false,
	style = CardStyle.DEFAULT,
	isPublic = false,
	selectedCards = [],
}) => {
	const selected = selectedCards.find((c) => c.id === card.id);
	return (
		<div
			onClick={() => active && !isOpponent && onClick(card.id)}
			className={classNames('card', {
				'card--inactive': !active && !isOpponent,
				'card--opponent': isOpponent,
				'card--selected': !!selected,
			}, style)}
			style={{ backgroundImage: `url(${isOpponent ? cardBack : cardFront})` }}
		>
			{state === "draft" && <div className="card__amount">{card.amount}</div>}
			{(!isOpponent || isPublic) && (
				<>
					<img src={asset} className="card__image" />
					<div className="card__info">
						<h4 className="card__info__title">{card.name}</h4>
						<div className="card__info__cost">
							<img src={coins} className="card__info__cost__image" />
							<p className="card__info__cost__text">{card.cost || card.budget}</p>
						</div>
					</div>
				</>
			)}
		</div>
	);
};