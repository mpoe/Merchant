import React, { FC } from 'react'
import classnames from 'classnames';

import './button.scss';

interface CustomButtonInterface {
	onClick: Function;
	text: String;
	className?: String;
}

const CustomButton: FC<CustomButtonInterface> = ({ onClick, text, className }) => (
	<div>
		<button type="button" className={classnames(className)} onClick={(e) => onClick(e)}>{text}</button>
	</div>
);

export default CustomButton;
