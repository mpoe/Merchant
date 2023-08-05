import React, { FC } from 'react';
import { Room } from '../../constants/types';

import './room-info.scss';

import LockIcon from '../../../../assets/lock-icon.png';

interface InteInforface {
	room: Room;
}

export const RoomInfo: FC<InteInforface> = ({ room }) => {
	return (
		<div className="room-info">
			<span className="room-name">
				{room.name}
			</span>
			<div>
				<span className="room-users">
					{`${room.users.length}/4`}
					{room.password !== '' && (
						<span className="room-password"><img className="icon" alt="lock icon" src={LockIcon} /></span>
					)}
				</span>
				<span className="host-name"> - {room.host.username}</span>
			</div>
		</div>
	);
};
