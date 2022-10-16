import React, { FC } from 'react';
import classnames from 'classnames';

import './lobby-header.scss';

interface LobbyHeaderInterface {
	title: String;
	className?: String;
}

const LobbyHeader: FC<LobbyHeaderInterface> = ({ title, className } = { title: '', className: null }) => (
	<h2 className={classnames('lobby-header', className)}>{title}</h2>
);

export default LobbyHeader;
