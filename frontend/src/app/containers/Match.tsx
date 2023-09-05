import React, { FC } from 'react';
import { Background } from '../components/background';
import { Match } from '../components/match';
import { Card, Room } from '../constants/types';
import { useSocket } from '../hooks/socket';

interface MatchContainerInterface {
    room: Room;
    playerId: String;
	showdown: boolean;
}

export const MatchContainer: FC<MatchContainerInterface> = ({ room, playerId, showdown }) => {
	const socket = useSocket();
	const $playCards = (cards: Array<Card>) => {
		socket.emit('PLAY_CARDS', ({ cards, playerId, roomId: room.id }));
	};
	return (
		<Background>
			<Match
				room={room}
				playerId={playerId}
				playCards={$playCards}
				showdown={showdown}
			/>
		</Background>
	);
};