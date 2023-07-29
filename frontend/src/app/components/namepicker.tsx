import React, { FC } from 'react';

import './namepicker.scss';

import Input from './interactions/input';
import Button from './interactions/button';
import { Background } from './background';

interface NamePickerProps {
	submit: Function;
	handleInput: Function;
	username: string;
}

const NamePicker: FC<NamePickerProps> = ({ handleInput, username, submit }) => (
	<Background>
		<div className="namepicker">
			<h1 className="namepicker__title">Merchant</h1>
			<Input
				value={username}
				name="username"
				onChange={(e: any) => handleInput(e)}
				placeholder="Username"
				containerClass="namepicker__input-container"
				className="namepicker__input"
				labelText=""
			/>
			<Button onClick={(e: any) => submit(e)} text="play" className="namepicker__submit" />
		</div>
	</Background>
);

export default NamePicker;
