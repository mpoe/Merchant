import React, { FC } from "react";


interface LobbyGoToButtonInterFace {
    goToLobby: React.MouseEventHandler<HTMLButtonElement>;
}

const LobbyGoToButton: FC<LobbyGoToButtonInterFace> = ({ goToLobby }) => {
    return (
        <button onClick={goToLobby}>{`${'< Back to lobby'}`}</button>
    )
}

export default LobbyGoToButton;