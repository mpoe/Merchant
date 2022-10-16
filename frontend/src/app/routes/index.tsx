import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';

import NamePicker from '../containers/Namepicker';
import NotFound from '../containers/NotFound';
import Lobby from '../containers/Lobby';
import LobbyList from '../containers/Lobby-list';
import Room from '../containers/Room';
import RoomCreate from '../containers/Room-create';

const Routes = () => (
	<Switch>
		<Route path="/" element={<NamePicker />} />
		<Route path="/room/:roomId" element={<Room />} />
		<Route path="/lobby/browse" element={<LobbyList />} />
		<Route path="/lobby/create" element={<RoomCreate />} />
		<Route path="/lobby" element={<Lobby />} />
		<Route path="*" element={<NotFound />} />
	</Switch>
);

export default Routes;
