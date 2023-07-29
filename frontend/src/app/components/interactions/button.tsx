import React, { FC } from 'react'
import classnames from 'classnames';

import './button.scss';

interface CustomButtonInterface {
	onClick: Function;
	text: string;
	className?: string;
}

const CustomButton: FC<CustomButtonInterface> = ({ onClick, text, className }) => (
	<button type="button" className={classnames(className)} onClick={(e) => onClick(e)}>{text}</button>
);

export default CustomButton;
