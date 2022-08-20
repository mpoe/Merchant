import React, { FC } from 'react';

import bg from 'assets/bg-frontpage.png';

interface BackGroundInterface {
	src?: string;
	children: React.ReactNode;
}

const Background: FC<BackGroundInterface> = ({ src, children } = { src: bg, children: null }) => {
	return (
		<div className="namepicker__bg" style={{ backgroundImage: `url(${src})` }}>
			{children}
		</div>
	);
};

export default Background;
