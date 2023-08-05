import React, { FC } from 'react'
import classnames from 'classnames';

import './button.scss';

export enum ButtonStyle {
	DEFAULT = "",
	BORDER = "button--border",
}

interface ButtonInterface {
	onClick: Function;
	text: string;
	className?: string;
	style?: ButtonStyle;
}

export const Button: FC<ButtonInterface> = ({ onClick, text, className, style = "DEFAULT" }) => (
	<button type="button" className={classnames(className, style)} onClick={(e) => onClick(e)}>{text}</button>
);
