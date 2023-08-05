import React, { FC } from "react";

import { Card as CardType } from '../../../constants/types';

import cardFront from '../../../../assets/card-front.svg';
import cardBack from '../../../../assets/card-back.png';

import './card.scss';

interface CardInterface {
    card: CardType;
    onClick(id: number): any;
}

export const Card: FC<CardInterface> = ({ card, onClick }) => {
    return (
        <div onClick={() => onClick(card.id)} className="card" style={{ backgroundImage: `url(${cardFront})` }}>
            <p className="card__title">{card.name}</p>
        </div>
    );
}