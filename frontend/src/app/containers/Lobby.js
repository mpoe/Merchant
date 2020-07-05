import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { PROPTYPE_HISTORY } from '../constants/proptypes';
import { getClientID, createRoomRequest } from '../api';
import Lobby from '../components/lobby';
import RequireName from '../hoc/requireName';

class LobbyContainer extends React.Component {
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

	componentDidMount() {
		getClientID(); // On load of the app (first page!) - get the clientid from the backend
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

	onLobby = () => {
		const { history: { push } } = this.props;
		push('/lobby/browse');
	}

	onPublicRoom = () => {
		const { state: { user: { id, username } } } = this.props;
		createRoomRequest({ host: id, password: '', name: `${username}'s room` });
	}

	render() {
		return (
			<Lobby
				onPublicRoom={this.onPublicRoom}
				onPrivateRoom={() => alert('not supported')}
				onLobby={this.onLobby}
			/>
		);
	}
}

const mapStateToProps = state => ({
	state,
});

const mapDispatchToProps = dispatch => ({
	/* sendTheAlert: () => {dispatch(ALERT_ACTION)} */
});

export default connect(mapStateToProps, mapDispatchToProps)(RequireName('/lobby')(LobbyContainer));
