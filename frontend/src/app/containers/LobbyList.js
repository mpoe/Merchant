import React from 'react';

import { /* getClientID */ createRoomRequest, getRooms } from '../api';
import LobbyList from '../components/lobbyList';

class LobbyListContainer extends React.Component {
	componentDidMount() {
		// getRooms();
	}

	componentDidUpdate(prevProps) {
		// if room is updated (onPublicRoom) -> redirect to /room/:roomId
		// could probably be handled better. but how?
		const { state: { room: { room } } } = this.props;
		const { history: { push } } = this.props;
		if (prevProps.state.room.room !== room) {
			push(`/room/${room.id}`);
		}
	}

	onPublicRoom = () => {
		const { state: { user: { id, username } } } = this.props;
		createRoomRequest({ host: id, password: '', name: `${username}'s room` });
	}

	onPrivateRoom = () => {
		const { history: { push } } = this.props;
		push('/lobby/create');
	}

	render() {
		const { state: { room: { rooms } } } = this.props;
		return (
			<LobbyList
				rooms={rooms}
				onPublicRoom={this.onPublicRoom}
				onPrivateRoom={this.onPrivateRoom}
			/>
		);
	}
}

LobbyListContainer.propTypes = {
};

export default LobbyListContainer;
