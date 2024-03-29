import React, { FC } from 'react';

import './layout.scss';

interface LobbyLayoutInterface {
	children: React.ReactNode;
}

export const LobbyLayout: FC<LobbyLayoutInterface> = ({ children }) => {
	return (
		<div className="lobby-layout__wrapper">
			<div className="lobby-layout__outer">
				<div className="lobby-layout__inner">
					{children}
				</div>
			</div>
		</div>
	);
};
