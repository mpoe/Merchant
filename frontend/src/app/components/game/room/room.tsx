import React, { FC } from 'react';

import bg from 'assets/bg-lobby.png';

import { Background } from '../../background';
import Header from '../../lobby/lobby-header';
import LobbyLayout from '../../lobby/wrapper';
import { Room } from '../../../constants/types';

import './room.scss';
import Button from '../../interactions/button';

interface RoomInterface {
	room?: Room;
	startGame: Function;
	isHost: Boolean;
}

const Room: FC<RoomInterface> = ({ room, startGame, isHost }) => {
	if (!room) {
		return null;
	}
	const { host } = room;
	return (
		<Background src={bg}>
			<LobbyLayout>
				{/* <LobbyGoToButton /> */}
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
				{isHost && (
					<div className="bottom-action">
						<Button className="button--colored button--small" onClick={startGame} text="start game" />
					</div>
				)}
			</LobbyLayout>
		</Background>
	);
};

export default Room;
