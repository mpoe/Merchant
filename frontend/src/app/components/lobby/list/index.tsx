import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import bg from 'assets/bg-lobby.png';

import { Background } from '../../background';
import { LobbyHeader } from '../header';
import { LobbyLayout } from '../layout';
import { LobbyActions } from '../actions';
import { RoomInfo } from '../room-info';

import './list.scss';

interface LobbyListInterface {
	rooms: Object; // give this a type.
	onPublicRoom: Function;
	onPrivateRoom: Function;
	onClickRoom: (event: React.MouseEvent<HTMLAnchorElement>, room: Object) => void;
}

export const LobbyList: FC<LobbyListInterface> = ({ rooms, onPublicRoom, onPrivateRoom, onClickRoom }) => (
	<Background src={bg}>
		<LobbyLayout>
			<LobbyHeader title="Lobby" className="lobby-header--80" />
			<div className="lobby-content">
				{Object.values(rooms).map(room => (
					<Link key={room.id} onClick={(event) => onClickRoom(event, room)} to={`/room/${room.id}`}>
						<RoomInfo room={room} />
					</Link>
				))}
			</div>
			<LobbyActions onPrivateRoom={onPrivateRoom} onPublicRoom={onPublicRoom} />
		</LobbyLayout>
	</Background>
);
