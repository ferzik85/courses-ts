import React from 'react';
import classnames from 'classnames';
import Input from '../Input/Input';
import Duration from '../Duration/Duration';
import styles from './DurationInput.module.css';
import validateDuration from '../../utils/ValidateDuration';

export interface DurationInputProps {
  name: string;
  duration: any;
  onChange: (value: string) => void;
  isInvalid: boolean;
  inputClassName?: string | null;
}

export const DurationInput: React.FC<DurationInputProps> = ({ name, duration, onChange, isInvalid, inputClassName = null }) => {
	const handleValueChange = (value: string) => {
		let val = value;
		if (!validateDuration(value)) val = '';
		onChange(val);
	};

	const assignInputClasses = () =>
		isInvalid ? classnames(styles.durationInput, inputClassName, styles.errorBorder) : classnames(styles.durationInput, inputClassName);

	return (
		<label className={styles.duration}>
			{name}
			<div>
				<Input value={duration} onChange={handleValueChange} className={assignInputClasses()} />
				<Duration duration={validateDuration(duration) ? duration : 0} className={styles.durationHours} />
			</div>
			{isInvalid && <p className={styles.error}>{name} is required.</p>}
		</label>
	);
}
