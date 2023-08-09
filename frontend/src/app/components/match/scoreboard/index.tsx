import React from "react";
import './scoreboard.scss';

export const Scoreboard = () => {
    return <div className="scoreboard">
        <div className="scoreboard__list-item">
            <p>Current player: </p>
            <p>mpoe_test</p>
        </div>

        <div className="scoreboard__list-item">
            <p>Visiting customer: </p>
            <p>Farmer - Morten</p>
        </div>

        <div className="scoreboard__list-item">
            <p>Scores:</p>
            <div className="scoreboard__list-item__score">
                <p>Mo: 1</p>
                <p>Bas: 3</p>
                <p>Ras: 2</p>
                <p>Lars: 0</p>
            </div>
        </div>
    </div>
}