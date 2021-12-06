import React from 'react';
import PropTypes from 'prop-types';

import bg from 'assets/bg-lobby.png';

import Background from '../background';
import Header from '../header';
import LobbyLayout from '../lobbyLayout';
import Actions from '../roomActions';

import './room.scss';

const Room = ({ room, startGame }) => {
	const host = room.users && room.users.find(user => user.id === room.host);
	return (
		<Background src={bg}>
			<LobbyLayout>
				<Header title={room.name} />
				<div className="room__info">
					<span>{`${room.users && room.users.length} player(s) waiting`}</span>
					<span>{`${host && host.username} is the host`}</span>
				</div>
				<div className="room__container">
					{room.users && room.users.map(user => (
						<span className="room__username">{user.username}</span>
					))}
				</div>
				<Actions startGame={startGame} />
			</LobbyLayout>
		</Background>
	);
};

Room.propTypes = {
	room: PropTypes.shape({}).isRequired,
	startGame: PropTypes.func.isRequired,
};

export default Room;
