import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import { NamePickerContainer } from '../containers/Namepicker';
import { NotFoundContainer } from '../containers/NotFound';
import { LobbyContainer } from '../containers/Lobby';
import { LobbyListContainer } from '../containers/Lobby-list';
import { RoomContainer } from '../containers/Room';
import { RoomCreateContainer } from '../containers/Room-create';

export const Router = () => (
	<Switch>
		<Route path="/" element={<NamePickerContainer />} />
		<Route path="/room/:roomId" element={<RoomContainer />} />
		<Route path="/lobby/browse" element={<LobbyListContainer />} />
		<Route path="/lobby/create" element={<RoomCreateContainer />} />
		<Route path="/lobby" element={<LobbyContainer />} />
		<Route path="*" element={<NotFoundContainer />} />
	</Switch>
);
