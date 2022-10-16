import React, { FC } from 'react';
import { Room } from '../../constants/types';

import './lobby-room-info.scss';

import LockIcon from '../../../../assets/lock-icon.png';

interface LobbyListInterface {
	room: Room;
}

const LobbyList: FC<LobbyListInterface> = ({ room }) => (
	<>
		<div className="room-info">
			<div className="room-info__public">
				<span className="room-name">
					{room.name}
				</span>
				<span className="room-users">
					{`${room.users.length} user(s)`}
				</span>
			</div>
			{room.password !== '' && (
				<span className="room-password"><img className="icon" alt="lock icon" src={LockIcon} /></span>
			)}
		</div>
	</>
);

export default LobbyList;
