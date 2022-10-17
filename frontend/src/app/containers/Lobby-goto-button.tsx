import React from 'react';
import { useNavigate } from 'react-router-dom';
import LobbyGoToButton from '../components/lobby/lobby-goto-button';

const LobbyGoToButtonContainer = () => {
    const nav = useNavigate()

    const $goToLobby = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        nav('../lobby/browse');
    };

    return <LobbyGoToButton goToLobby={$goToLobby} />;
};

export default LobbyGoToButtonContainer;