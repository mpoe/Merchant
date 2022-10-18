import React, { FC } from 'react';
import { Room } from '../../constants/types';

import './lobby-room-info.scss';

import LockIcon from '../../../../assets/lock-icon.png';

interface LobbyListInterface {
	room: Room;
}

const LobbyListRoom: FC<LobbyListInterface> = ({ room }) => {
	return (
		<>
			<div className="room-info">
				<div className="room-info__public">
					<span className="room-name">
						{room.name}
					</span>
					<div>
						<span className="room-users">
							{`${room.users.length}/4`}
						</span>
						<span className="host-name"> - {room.host.username}</span>
					</div>
				</div>
				{room.password !== '' && (
					<span className="room-password"><img className="icon" alt="lock icon" src={LockIcon} /></span>
				)}
			</div>
		</>
	);
};

export default LobbyListRoom;
