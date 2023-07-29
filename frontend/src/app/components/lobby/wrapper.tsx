import React, { FC } from 'react';

import './wrapper.scss';

interface LobbyWrapperInterface {
	children: React.ReactNode;
}

const LobbyWrapper: FC<LobbyWrapperInterface> = ({ children }) => {
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

export default LobbyWrapper;
