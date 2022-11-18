import React, { FC } from 'react';

import Button from '../../../interactions/button';

interface LobbyActionsInterface {
	onCancel: Function;
	onCreate: Function;
}

const LobbyActions: FC<LobbyActionsInterface> = ({ onCancel, onCreate }) => (
	<div className="bottom-actions">
		<Button className="button--colored button--small" onClick={() => onCancel()} text="cancel" />
		<Button className="button--colored button--small" onClick={() => onCreate()} text="create room" />
	</div>
);

export default LobbyActions;
