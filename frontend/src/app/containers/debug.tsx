import React, { Fragment, useEffect, useState } from 'react';
import CustomButton from '../components/interactions/button';
import { Card, Customer, Room, User } from '../constants/types';
import { useSocket } from '../hooks/socket';

const DebugContainer = () => {
    const socket = useSocket();
    const [serverState, setServerState] = useState(null);
    useEffect(() => {
        if (socket) {
            socket.on('GAME_STATE', (data: any) => {
                setServerState(data);
            });
            return () => {
                socket.removeAllListers();
            }
        }
    }, [socket]);

    const $seedRoom = () => {
        socket.emit('SEED_GAME')
    }

    const $seedDraft = () => {
        socket.emit('SEED_DRAFT');
    }

    console.log('serverState', serverState);

    return (
        <>
            <div style={{ width: '20%', backgroundColor: 'bisque', display: 'flex', flexDirection: 'column', position: 'absolute', right: '2%' }}>
                <>
                    Server state:

                    <div><strong>users:</strong></div>
                    {serverState && Object.values(serverState.users).map((user: User) => {
                        return (
                            <div key={user.id}>
                                {user.id}: {user.username}
                            </div>
                        )
                    })}
                    <div><strong>rooms:</strong></div>
                    {serverState && Object.values(serverState.rooms).map((room: Room) => {
                        return (
                            <div key={room.id}>
                                <p>customers: <strong>{room.state.customers.map((customer: Customer) => {
                                    return <Fragment key={customer.id}>{customer.name}, </Fragment>
                                })}</strong></p>
                                <p>host: <strong>{room.host?.username}</strong></p>
                                <p>users: <strong>{room.users.map((user: User) => {
                                    return <Fragment key={user.id}>{user.username}, </Fragment>;
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
                        )
                    })}
                    <CustomButton onClick={$seedDraft} text="seed" />
                </>
            </div>
        </>
    )
}

export default DebugContainer;