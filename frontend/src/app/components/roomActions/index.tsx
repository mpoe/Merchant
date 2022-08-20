import React, { FC } from 'react';

import Button from '../button';

interface LobbyActionsInterface {
	startGame: Function;
}

const LobbyActions: FC<LobbyActionsInterface> = ({ startGame }) => (
	<div className="bottom-action">
		<Button className="button--colored button--small" onClick={startGame} text="start game" />
	</div>
);

export default LobbyActions;
