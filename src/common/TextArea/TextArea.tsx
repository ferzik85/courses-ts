import React from 'react';
import classnames from 'classnames';
import styles from './TextArea.module.css';

export interface TextAreaProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string | null;
}

const TextArea: React.FC<TextAreaProps> = ({
  value = '',
  onChange,
  className = null,
}) => {
  return (
    <textarea
      value={value}
      className={classnames(styles.area, className)}
      placeholder="Input text"
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange?.(e.target.value)}
    />
  );
};

export default TextArea;
