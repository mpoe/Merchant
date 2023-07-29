import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import RoomCreate from '../components/game/room/create';
import { Room } from '../constants/types';
import { useSocket } from '../hooks/socket';

const RoomCreateContainer = () => {
	const [password, setPassword] = useState('');
	const [roomName, setRoomName] = useState('');
	const socket = useSocket();

	const nav = useNavigate();

	const $onChangePassword = (e: any) => {
		setPassword(e.target.value);
	}

	const $onCreateRoom = () => {
		socket.emit('CREATE_ROOM', { password, name: roomName });
	}

	const $onChangeRoomName = (e: any) => {
		setRoomName(e.target.value)
	}

	const $onCancel = () => {
		$goToBrowse();
	}

	const $goToBrowse = () => {
		nav('/lobby/browse');
	}

	useEffect(() => {
		if (socket) {

			socket.on('JOINED_ROOM', (room: Room) => {
				nav(`/room/${room.id}`)
			})
			return () => {
				socket.off('JOINED_ROOM');
			}
		}
	}, [socket]);

	return (
		<RoomCreate
			password={password}
			roomName={roomName}
			handlePassword={$onChangePassword}
			handleRoomName={$onChangeRoomName}
			handleCreate={$onCreateRoom}
			handleCancel={$onCancel}
			handleBack={$goToBrowse}
		/>
	);
}

export default RoomCreateContainer;
