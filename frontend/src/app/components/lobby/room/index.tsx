import React, { FC } from 'react';

import bg from 'assets/bg-lobby.png';

import { Background } from '../../background';
import { LobbyHeader } from '../header';
import { LobbyLayout } from '../layout';
import { Room as RoomType } from '../../../constants/types';

import './room.scss';
import { Button, ButtonStyle } from '../../interactions/button';

interface RoomInterface {
	room?: RoomType;
	startGame: Function;
	goToBrowse: Function;
	isHost: Boolean;
}

export const Room: FC<RoomInterface> = ({ room, startGame, isHost, goToBrowse }) => {
	if (!room) {
		return null;
	}
	const { host } = room;
	return (
		<Background src={bg}>
			<LobbyLayout>
				<LobbyHeader title={room.name} />
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
					<Button className="button--colored button--small" onClick={startGame} text="start game" />
				)}
				<div className="bottom-action">
					<Button style={ButtonStyle.BORDER} onClick={goToBrowse} text="Leave room" className='room__back-button' />
				</div>
			</LobbyLayout>
		</Background>
	);
};
