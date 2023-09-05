import React, { Fragment, useEffect, useState } from 'react';
import { Button } from '../components/interactions/button';
import { Card, Customer, Room, User, Player } from '../constants/types';
import { useSocket } from '../hooks/socket';

export const DebugContainer = () => {
	const socket = useSocket();
	const [serverState, setServerState] = useState(null);
	const [display, setDisplay] = useState('flex');
	useEffect(() => {
		if (socket) {
			socket.on('GAME_STATE', (data: any) => {
				setServerState(data);
			});
			return () => {
				socket.removeAllListeners();
			};
		}
	}, [socket]);

	const $seedDraft = () => {
		socket.emit('SEED_DRAFT');
	};

	const $toggleDisplay = () => {
		if (display === 'flex') {
			return setDisplay('none');
		}
		setDisplay('flex');
	};

	return (
		<>
			<div style={{ zIndex: 1111, width: '400px', backgroundColor: 'bisque', display: `${display}`, flexDirection: 'column', position: 'absolute', right: '2%' }}>
				<>
					Server state:

					<div><strong>users:</strong></div>
					{serverState && Object.values(serverState.users).map((user: User) => {
						return (
							<div key={user.id}>
								{user.id}: {user.username}
							</div>
						);
					})}
					<div><strong>rooms:</strong></div>
					{serverState && Object.values(serverState.rooms).map((room: Room) => {
						return (
							<div key={room.id}>
								<p>customers: <strong>{room.state.customers.map((customer: Customer) => {
									return <Fragment key={customer.id}>{customer.name}, </Fragment>;
								})}</strong></p>
								<p>host: <strong>{room.host?.username}</strong></p>
								<p>users: <strong>{room.state.players.map((user: Player) => {
									return <p key={user.id}>{user.username}, deck: {user.deck.map((c) => c.id)}, hand: {user.hand.map((c) => c.id)}, </p>;
								})}</strong></p>
								<p>draftpool: <strong>{room.state.draftpool.map((card: Card) => {
									return <Fragment key={card.id}>{card.name}, </Fragment>;
								})}</strong></p>
								<p>cardpool: <strong>{room.state.cardpool.map((card: Card) => {
									return <Fragment key={card.id}>{card.name}, </Fragment>;
								})}</strong></p>
								<p>phase: <strong>{room.state.phase}</strong></p>
								<p>round: <strong>{room.state.round}</strong></p>
							</div>
						);
					})}
					<Button onClick={$seedDraft} text="seed" />
					<Button onClick={$toggleDisplay} text="hide" />
				</>
			</div>
		</>
	);
};