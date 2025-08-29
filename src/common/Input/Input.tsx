import React from 'react';
import classnames from 'classnames';
import styles from './Input.module.css';

export interface InputProps {
  value?: any;
  onChange?: (value: string) => void;
  className?: string | null;
}

const Input: React.FC<InputProps> = ({ value = '', onChange, className = null}) => {
  return (
    <input
      type="text"
      value={value}
      className={classnames(styles.input, className)}
      placeholder="Input text"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value)}
    />
  );
};

export default Input;

