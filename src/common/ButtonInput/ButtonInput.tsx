import React, { useState } from 'react';
import classnames from 'classnames';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './ButtonInput.module.css';

export interface ButtonInputProps {
  labelName: string;
  buttonName: string;
  onClick: (value: string) => void;
  validateInput: (value: string) => boolean;
  inputClassName?: string | null;
}

export const ButtonInput: React.FC<ButtonInputProps> = ({ labelName, buttonName, onClick, validateInput, inputClassName = null }) => {
	const [value, setValue] = useState<string>('');
	const [valueIsInvalid, setValueIsInvalid] = useState<boolean>(false);
	const handleValueChange = (val: string) => {
		setValue(val);
		setValueIsInvalid(false);
	};

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const invalid = !validateInput(value);
		setValueIsInvalid(invalid);
		if (invalid) return;
		onClick(value);
		setValue('');
	};

	const inputClasses = () =>
		valueIsInvalid ? classnames(styles.labelInput, inputClassName, styles.errorBorder) : classnames(styles.labelInput, inputClassName);

	return (
		<label className={styles.label}>
			{labelName}
			<div>
				<Input value={value} onChange={handleValueChange} className={inputClasses()} />
				<Button label={buttonName} className={styles.labelButton} onClick={handleClick} />
			</div>
			{valueIsInvalid && <p className={styles.error}>{labelName} is required.</p>}
		</label>
	);
}
