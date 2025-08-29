import React from 'react';
import classnames from 'classnames';
import styles from './Duration.module.css';
import formatDuration from '../../utils/FormatDuration';

export interface DurationProps {
  duration: number | string;
  className?: string | null;
}

const Duration: React.FC<DurationProps> = ({ duration, className =null }) => {
	const formattedDuration = formatDuration(duration).split(' ');
	const formattedTime = formattedDuration[0];
	const formattedText = formattedDuration[1];
	return (
		<span className={classnames(styles.duration, className)}>
			<b>{formattedTime}</b> {formattedText}
		</span>
	);
}

export default Duration;
