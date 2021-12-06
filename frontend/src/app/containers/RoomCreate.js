import React from 'react';
import PropTypes from 'prop-types';

import { PROPTYPE_HISTORY } from '../constants/proptypes';
import { createRoomRequest } from '../api';

import RoomCreate from '../components/roomCreate';

class RoomCreateContainer extends React.Component {
	static propTypes = {
		state: PropTypes.shape({
			room: PropTypes.shape({
				rooms: PropTypes.array,
				room: PropTypes.shape({
					id: PropTypes.number,
				}),
			}),
		}).isRequired,
		history: PROPTYPE_HISTORY.isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
			password: '',
			roomName: '',
		};
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

	onChangePassword = (e) => {
		this.setState({
			password: e.target.value,
		});
	}

	onCreateRoom = () => {
		const { state: { user: { id } } } = this.props;
		const { password, roomName } = this.state;
		createRoomRequest({ host: id, password, name: roomName });
	}

	onChangeRoomName = (e) => {
		this.setState({
			roomName: e.target.value,
		});
	}

	onCancel = () => {
		const { history: { push } } = this.props;
		push('/lobby');
	}

	render() {
		const { password, roomName } = this.state;
		return (
			<RoomCreate
				password={password}
				roomName={roomName}
				handlePassword={this.onChangePassword}
				handleRoomName={this.onChangeRoomName}
				handleCreate={this.onCreateRoom}
				handleCancel={this.onCancel}
			/>
		);
	}
}

export default RoomCreateContainer;
