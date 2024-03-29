import React, { FC } from 'react';

import { Button } from '../../interactions/button';

interface CreateRoomActionsInterface {
	onCancel: Function;
	onCreate: Function;
}

export const CreateRoomActions: FC<CreateRoomActionsInterface> = ({ onCancel, onCreate }) => (
	<div className="bottom-actions">
		<Button className="button--colored button--small" onClick={() => onCancel()} text="cancel" />
		<Button className="button--colored button--small" onClick={() => onCreate()} text="start" />
	</div>
);
