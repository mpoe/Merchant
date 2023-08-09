import React, { FC } from "react";
import './opponent.scss';
import classNames from "classnames";
import { Card, CardStyle } from "../../card";

interface OpponentInterface {
    i: number
}

export const Opponent: FC<OpponentInterface> = ({ i }) => {
    const cards = [
        {
            "name": "Raspberry",
            "amount": 3,
            "cost": 200,
            "id": 1
        },
        {
            "name": "Wheat",
            "amount": 2,
            "cost": 300,
            "id": 2
        }, {
            "name": "Hat",
            "amount": 1,
            "cost": 400,
            "id": 3
        },
        {
            "name": "Milk",
            "amount": 2,
            "cost": 500,
            "id": 4
        }
    ]
    return <div className={classNames('opponent', `opponent-${i}`)}>
        <div className="opponent__card-container">
            {cards.map((card) => {
                return <Card key={card.id} card={card} onClick={() => { }} active={false} state="game" isOpponent style={CardStyle.SMALL} />
            })}

        </div>
    </div>
}