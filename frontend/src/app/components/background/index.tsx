import React, { FC } from 'react';
import PropTypes from 'prop-types';

import bg from 'assets/bg-frontpage.png';

interface BackGroundInterface {
	src?: string;
	children: React.ReactNode;
}

const Background: FC<BackGroundInterface> = (props) => {
	return (
		<div className="namepicker__bg" style={{ backgroundImage: `url(${props.src})` }}>
			{props.children}
		</div>
	);
};

Background.propTypes = {
	src: PropTypes.any,
};

Background.defaultProps = {
	src: bg,
};

export default Background;
