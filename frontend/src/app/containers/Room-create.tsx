import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import RoomCreate from '../components/game/room/create/room-create';
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
		socket.emit('GET_NEXT_ROOM_ID', { password, name: roomName });
	}

	const $onChangeRoomName = (e: any) => {
		setRoomName(e.target.value)
	}

	const $onCancel = () => {
		nav('/lobby/browse');
	}

	useEffect(() => {
		if (socket) {
			socket.on('GET_NEXT_ROOM_ID_RES', (res: { roomId: string; roomInfo: Object; }) => {
				const { roomId, roomInfo } = res;
				socket.emit('CREATE_ROOM', { roomId, roomSettings: roomInfo });
			});

			socket.on('JOINED_ROOM', (room: Room) => {
				nav(`/room/${room.id}`)
			})
			return () => {
				socket.off("GET_NEXT_ROOM_ID_RES");
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
		/>
	);
}

export default RoomCreateContainer;
