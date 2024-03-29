import React, { useEffect, useState, FC } from 'react';
import { Room, User, GamePhase } from '../constants/types';
import { useSocket } from '../hooks/socket';
import { MatchContainer } from './Match';
import { DraftContainer } from './Draft';

interface MerchantContainerInterface {
    roomData: Room;
}

export const MerchantContainer: FC<MerchantContainerInterface> = ({ roomData }) => {
	const socket = useSocket();
	const [room, setRoom] = useState<Room>(roomData);
	const [playerId, setPlayerId] = useState(null);
	const [showdown, setShowdown] = useState(false);

	useEffect(() => {
		if (socket) {
			socket.emit('SET_USERNAME_REQ', "mpoe");
			socket.emit('WHO_AM_I');
			socket.on('DRAFT_SEEDED', (room: Room) => {
				setRoom(room);
			});
			socket.on('CARD_DRAFTED', (room: Room) => {
				setRoom(room);
			});
			socket.on('YOU_ARE', (user: User) => {
				setPlayerId(user.id);
			});
			socket.on('START_ROUND', (room: Room) => {
				setShowdown(false);
				setRoom(room);
			});
			socket.on('CARDS_PLAYED', (room: Room) => {
				setRoom(room);
			});
			socket.on('SHOWDOWN', (room: Room) => {
				setRoom(room);
				setShowdown(true);
			});
			return () => {
				socket.removeAllListeners();
			};
		}
	}, [socket]);

	return room && (
		<>
			{room.state.phase === GamePhase.DRAFT_PHASE && (
				<DraftContainer
					isActivePlayer={playerId === room.state.activePlayer.id}
					room={room}
					userId={playerId}
				/>
			)}

			{room.state.phase === GamePhase.GAME_PHASE && (
				<MatchContainer
					room={room}
					playerId={playerId}
					showdown={showdown}
				/>
			)}

			{room.state.phase === GamePhase.SCORE_PHASE && (
				<div>Hi</div>
			)}
		</>
	);
};