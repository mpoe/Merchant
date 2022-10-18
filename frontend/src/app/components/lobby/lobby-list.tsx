import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import bg from 'assets/bg-lobby.png';

import Background from '../background';
import LobbyHeader from './lobby-header';
import LobbyLayout from './lobby-layout';
import LobbyActions from './lobby-actions';
import RoomInfo from './lobby-room-info';

import './lobby-list.scss';

type ClickRoomFunction = {
	(event: React.MouseEvent<HTMLAnchorElement>, room: Object): void;
}

interface LobbyListInterface {
	rooms: Object;
	onPublicRoom: Function;
	onPrivateRoom: Function;
	onClickRoom: ClickRoomFunction;
}

const LobbyList: FC<LobbyListInterface> = ({ rooms, onPublicRoom, onPrivateRoom, onClickRoom }) => (
	<Background src={bg}>
		<LobbyLayout>
			<LobbyHeader title="Lobby" className="lobby-header--80" />
			<div className="lobby-wrapper">
				<div className="lobby-content">
					{Object.values(rooms).map(room => (
						<Link key={room.id} onClick={(event) => onClickRoom(event, room)} to={`/room/${room.id}`}>
							<RoomInfo room={room} />
						</Link>
					))}
				</div>
			</div>
			<LobbyActions onPrivateRoom={onPrivateRoom} onPublicRoom={onPublicRoom} />
		</LobbyLayout>
	</Background>
);

export default LobbyList;
