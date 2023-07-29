import React, { FC } from 'react';
import classnames from 'classnames';

import './input.scss';

interface CustomInputInterface {
	value: string;
	name: string;
	onChange: Function;
	placeholder?: string;
	className?: string;
	containerClass?: string;
	labelClass?: string;
	labelText?: string;
}

const CustomInput: FC<CustomInputInterface> = ({
	value, name, onChange, placeholder = 'placeholder', className = null, containerClass = null, labelClass = null, labelText = null,
}) => (
	<div className={classnames(containerClass)}>
		<label htmlFor={name} className={classnames('textinput__label', labelClass)}>
			{labelText}
			<input className={classnames('textinput', className)} value={value} name={name} onChange={(e) => onChange(e)} placeholder={placeholder} />
		</label>
	</div>
);

export default CustomInput;
