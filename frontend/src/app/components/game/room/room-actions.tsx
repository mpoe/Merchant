import React, { FC } from 'react';

import Button from '../../interactions/button';

interface RoomActionsInterface {
	startGame: Function;
}

const RoomActions: FC<RoomActionsInterface> = ({ startGame }) => (
	<div className="bottom-action">
		<Button className="button--colored button--small" onClick={startGame} text="start game" />
	</div>
);

export default RoomActions;
