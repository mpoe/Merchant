import PropTypes from 'prop-types';

const PROPTYPE_HISTORY = PropTypes.shape({
	push: PropTypes.func,
});

export const PROPTYPE_TEST = PropTypes.shape({});

const PROPTYPE_CHILDREN = PropTypes.node;

export {
	PROPTYPE_HISTORY,
	PROPTYPE_CHILDREN,
};
