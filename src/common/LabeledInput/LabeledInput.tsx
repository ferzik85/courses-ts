import React from 'react';
import classnames from 'classnames';
import Input from '../Input/Input';
import TextArea from '../TextArea/TextArea';
import styles from './LabeledInput.module.css';

export interface InputProps {
	name: string;
	onChange: (value: string) => void;
	isInvalid: boolean;
	inputClassName?: string | null;
	isTextArea?: boolean;
	value?: string;
}

const LabeledInput: React.FC<InputProps> = ({
  name,
  value,
  onChange,
  isInvalid,
  inputClassName = null,
  isTextArea,
}) => {
  const defaultClassNames = classnames(styles.labelInput, inputClassName);
  const errorClassNames = classnames(styles.labelInput,inputClassName,styles.errorBorder);
  const assignInputClasses = isInvalid ? errorClassNames : defaultClassNames;
  const inputElement = (
    <Input value={value} onChange={onChange} className={assignInputClasses} />
  );
  const textAreaElement = (
    <TextArea
      value={value}
      onChange={onChange}
      className={assignInputClasses}
    />
  );

  return (
    <label className={styles.label}>
      {name}
      <div>{!isTextArea ? inputElement : textAreaElement}</div>
      {isInvalid && <p className={styles.error}>{name} is required.</p>}
    </label>
  );
};

export default LabeledInput;