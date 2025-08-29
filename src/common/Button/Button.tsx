import React from 'react';
import classnames from 'classnames';
import styles from './Button.module.css';

export type ButtonType = 'button' | 'submit' | 'reset';

export interface ButtonProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: ButtonType;
  formName?: string;
  className?: string | null;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = 'button', formName, className = null }) => {
	return (
		<button type={type} form={formName} className={classnames(styles.button, className)} onClick={onClick}>
			{label}
		</button>
	);
}

export default Button;


