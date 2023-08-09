import React from "react";
import './player.scss';
import { Card } from "../../card";

export const Player = () => {
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
    return <div className="player">
        {cards.map((card) => {
            return <Card key={card.id} card={card} onClick={() => { }} active state="game" />
        })}
    </div>
}