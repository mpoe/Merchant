import React, { FC } from 'react';

import bg from 'assets/bg-lobby.png';

import Background from '../../background';
import Header from '../../lobby/lobby-header';
import LobbyLayout from '../../lobby/lobby-layout';
import Actions from './room-actions';
import { Room } from '../../../constants/types';

import './room.scss';

interface RoomInterface {
	room?: Room;
	startGame: Function;
}

const Room: FC<RoomInterface> = ({ room, startGame }) => {
	if (!room) {
		return null;
	}
	const { host } = room;
	return (
		<Background src={bg}>
			<LobbyLayout>
				<Header title={room.name} />
				<div className="room__info">
					<span>{`${room.users.length} player(s) waiting`}</span>
					<span>{`${host.username} is the host`}</span>
				</div>
				<div className="room__container">
					{room.users.map(user => (
						<span key={user.id} className="room__username">{user.username}</span>
					))}
				</div>
				<Actions startGame={startGame} />
			</LobbyLayout>
		</Background>
	);
};

export default Room;
