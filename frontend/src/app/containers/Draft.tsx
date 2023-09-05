import React, { FC } from 'react';
import { Draft } from '../components/draft';
import { Room } from '../constants/types';
import { useSocket } from '../hooks/socket';

interface DraftContainerInterface {
    room: Room
    userId: string
    isActivePlayer: boolean
}

export const DraftContainer: FC<DraftContainerInterface> = ({ room, userId, isActivePlayer }) => {
	const socket = useSocket();

	const $onClickCard = (id: number) => {
		socket.emit('DRAFT_CARD', { cardId: id, roomId: room.id, userId });
	};

	return <Draft room={room} isActivePlayer={isActivePlayer} onClickCard={$onClickCard} />;
};