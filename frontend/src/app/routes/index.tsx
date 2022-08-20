import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';

import NamePicker from '../containers/NamePicker';
import NotFound from '../containers/NotFound';
import Lobby from '../containers/Lobby';
import LobbyList from '../containers/LobbyList';
import Room from '../containers/Room';
import RoomCreate from '../containers/RoomCreate';

const Routes = () => (
	<Switch>
		<Route path="/" element={<NamePicker />} />
		<Route path="/room/:roomId" element={<Room />} />
		<Route path="/lobby/browse" element={<LobbyList />} />
		<Route path="/lobby/create" element={<RoomCreate />} />
		<Route path="/lobby" element={<Lobby />} />
		<Route element={<NotFound />} />
	</Switch>
);

export default Routes;
