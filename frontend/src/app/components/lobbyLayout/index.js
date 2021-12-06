import React from 'react';
import PropTypes from 'prop-types';

import { PROPTYPE_CHILDREN } from '../../constants/proptypes';

import './lobbyLayout.scss';

const LobbyLayout = ({ children }) => {
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

LobbyLayout.propTypes = {
	children: PROPTYPE_CHILDREN,
};

LobbyLayout.defaultProps = {
	children: null,
};

export default LobbyLayout;
