import React, { FC } from 'react';

import Button from '../interactions/button';
import Background from '../background';

import './lobby.scss';

interface LobbyInterface {
	onPublicRoom?: Function;
	onPrivateRoom: Function;
	onLobby: Function;
}

const Lobby: FC<LobbyInterface> = ({ onPublicRoom, onPrivateRoom, onLobby } = { onPublicRoom: () => { }, onLobby: null, onPrivateRoom: null }) => (
	<Background>
		<div className="lobby__container">
			<Button text="PUBLIC ROOM" className="lobby__button" onClick={() => onPublicRoom()} />
			<Button text="PRIVATE ROOM" className="lobby__button" onClick={() => onPrivateRoom()} />
			<Button text="LOBBY" className="lobby__button" onClick={() => onLobby()} />
		</div>
	</Background>
);

export default Lobby;
