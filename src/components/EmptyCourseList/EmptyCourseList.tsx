import React from 'react';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { isAdmin } from '../../store/user/selectors';
import Button from '../../common/Button/Button';
import styles from './EmptyCourseList.module.css';

function EmptyCourseList() {
	const isAdminUser = useSelector(isAdmin);
	return (
		<>
			<div className={styles.emptyListRow}>Your List Is Empty</div>
			{isAdminUser ? (
				<>
					<div className={styles.emptyListRow}>Please use &apos;Add New Course&apos; button to add your first course</div>
					<div className={styles.emptyListRow}>
						<Link to='add'>
							<Button label='ADD NEW COURSE' />
						</Link>
					</div>
				</>
			) : (
				<div className={styles.emptyListRow}> You don&apos;t have permissions to create a course. Please log in as ADMIN.</div>
			)}
		</>
	);
}

export default EmptyCourseList;
