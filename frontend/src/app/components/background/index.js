import React from 'react';
import PropTypes from 'prop-types';

import { PROPTYPE_CHILDREN } from '../../constants/proptypes';

import bg from 'assets/bg-frontpage.png';

const Background = ({ src, children }) => {
	return (
		<div className="namepicker__bg" style={{ backgroundImage: `url(${src})` }}>
			{children}
		</div>
	);
};

Background.propTypes = {
	src: PropTypes.any,
	children: PROPTYPE_CHILDREN,
};

Background.defaultProps = {
	src: bg,
	children: null,
};

export default Background;
