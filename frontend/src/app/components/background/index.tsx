import React, { FC } from 'react';
import classnames from 'classnames';

import bg from '../../../../assets/bg-frontpage.png';
import './background.scss';

interface BackGroundInterface {
	src?: string;
	children: React.ReactNode;
	className?: string;
}

export const Background: FC<BackGroundInterface> = ({ src, children, className }) => {
	return (
		<div className={classnames("background", className)} style={{ backgroundImage: `url(${src})` }}>
			{children}
		</div>
	);
};

Background.defaultProps = {
	src: bg,
}
