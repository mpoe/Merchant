import React, { FC } from "react";

import { Card as CardType } from '../../constants/types';

import cardFront from '../../../../assets/card-front.svg';
import cardBack from '../../../../assets/card-back.png';

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
    state: String;
    style?: CardStyle;
}

export const Card: FC<CardInterface> = ({ card, onClick, active, state, isOpponent = false, style = CardStyle.DEFAULT }) => {
    return (
        <div
            onClick={() => active && !isOpponent && onClick(card.id)}
            className={classNames('card', {
                'card--inactive': !active && !isOpponent,
                'card--opponent': isOpponent,
            }, style)}
            style={{ backgroundImage: `url(${isOpponent ? cardBack : cardFront})` }}
        >
            {state === "draft" && <div className="card__amount">{card.amount}</div>}
            {!isOpponent && <p className="card__title">{card.name}</p>}
        </div>
    );
}