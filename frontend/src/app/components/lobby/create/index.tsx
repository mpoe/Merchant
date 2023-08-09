import React, { FC } from 'react';

import bg from 'assets/bg-lobby.png';

import { Background } from '../../background';
import { LobbyHeader } from '../header';
import { LobbyLayout } from '../layout';
import { Input } from '../../interactions/input';
import { CreateRoomActions } from './actions';

import './room-create.scss';

interface RoomCreateInterFace {
	roomName: string;
	handleRoomName: Function;
	password: string;
	handlePassword: Function;
	handleCancel: Function;
	handleCreate: Function;
	handleBack: Function;
}

export const RoomCreate: FC<RoomCreateInterFace> = ({
	roomName,
	handleRoomName,
	password,
	handlePassword,
	handleCancel,
	handleCreate,
	handleBack,
}) => (
	<Background src={bg}>
		<LobbyLayout>
			<LobbyHeader title="create room" />
			<div className="room-create__container">
				<Input
					value={roomName}
					name="roomName"
					onChange={handleRoomName}
					placeholder=""
					labelText="ROOM NAME"
					containerClass="room-create__input-container"
					labelClass="room-create__input-label"
					className="room-create__input"
				/>
				<Input
					value={password}
					name="password"
					onChange={handlePassword}
					placeholder="empty (public room)"
					labelText="ROOM PASSWORD"
					containerClass="room-create__input-container"
					labelClass="room-create__input-label"
					className="room-create__input"
				/>
			</div>
			<CreateRoomActions onCancel={handleCancel} onCreate={handleCreate} />
		</LobbyLayout>
	</Background>
);
