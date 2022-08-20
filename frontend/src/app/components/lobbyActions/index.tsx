import React, { FC } from 'react';

import Button from '../button';

interface LobbyActionsInterface {
	onPublicRoom?: Function;
	onPrivateRoom: Function;
};

const LobbyActions: FC<LobbyActionsInterface> = ({ onPublicRoom, onPrivateRoom } = { onPublicRoom: () => { }, onPrivateRoom: null }) => (
	<div className="bottom-actions">
		<Button className="button--colored button--small" onClick={() => onPublicRoom()} text="create public room" />
		<Button className="button--colored button--small" onClick={() => onPrivateRoom()} text="create private room" />
	</div>
);

export default LobbyActions;
