import React, { FC } from 'react';
import classnames from 'classnames';

import './header.scss';

interface LobbyHeaderInterface {
	title: string;
	className?: string;
}

export const LobbyHeader: FC<LobbyHeaderInterface> = ({ title, className } = { title: '', className: null }) => (
	<h2 className={classnames('lobby-header', className)}>{title}</h2>
);
