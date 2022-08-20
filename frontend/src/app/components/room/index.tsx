import React, { FC } from 'react';

import bg from 'assets/bg-lobby.png';

import Background from '../background';
import Header from '../header';
import LobbyLayout from '../lobbyLayout';
import Actions from '../roomActions';
import { Room } from '../../constants/types';

import './room.scss';

interface RoomInterface {
	room: Room;
	startGame: Function;
	id: String;
}

const Room: FC<RoomInterface> = ({ room, startGame, id }) => {
	const host = room.users?.filter((user) => user).find(user => user.id === room.host);
	return (
		<Background src={bg}>
			<LobbyLayout>
				<Header title={room.name} />
				<div className="room__info">
					<span>{`${room.users && room.users.length} player(s) waiting`}</span>
					<span>{`${host?.username} is the host`}</span>
				</div>
				<div className="room__container">
					{room.users && room.users.map(user => (
						<span className="room__username">{user?.username}</span>
					))}
				</div>
				<Actions startGame={startGame} />
			</LobbyLayout>
		</Background>
	);
};

export default Room;
