import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './input.scss';

const CustomInput = ({
	value, name, onChange, placeholder, className, containerClass, labelClass, labelText,
}) => (
	<div className={classnames('textinput__container', containerClass)}>
		<label htmlFor={name} className={classnames('textinput__label', labelClass)}>
			{labelText}
			<input className={classnames('textinput', className)} value={value} name={name} onChange={onChange} placeholder={placeholder} />
		</label>
	</div>
);

CustomInput.propTypes = {
	value: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	className: PropTypes.string,
	containerClass: PropTypes.string,
	labelClass: PropTypes.string,
	labelText: PropTypes.string,
};

CustomInput.defaultProps = {
	onChange: null,
	placeholder: 'placeholder',
	className: '',
	containerClass: '',
	labelClass: '',
	labelText: null,
};

export default CustomInput;
