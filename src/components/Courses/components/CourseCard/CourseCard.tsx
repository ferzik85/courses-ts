import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import classnames from 'classnames';
import { deleteCourse } from '../../../../store/courses/thunk';
import Button from '../../../../common/Button/Button';
import formatDate from '../../../../utils/FormatDate';
import formatDuration from '../../../../utils/FormatDuration';
import formatAuthors from '../../../../utils/FormatAuthors';
import { isAdminUser } from '../../../../localStorage/StorageAccess';
import styles from './CourseCard.module.css';

function CourseCard({ id, title, description, creationDate, duration, authors } : any) {
	const buttonStyle = 'material-symbols-outlined';
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleDeleteCourse = () => dispatch(deleteCourse(id));
	const handleEditCourse = () => navigate(`update/${id}`);
	return (
		<div className={styles.card}>
			<div className={styles.cardLeft}>
				<p className={styles.title}>{title}</p>
				<p className={styles.description}>{description}</p>
			</div>
			<div className={styles.cardRight}>
				<div>
					<p>
						<span>Authors: </span>
						{formatAuthors(authors)}
					</p>
					<p>
						<span>Duration: </span>
						{formatDuration(duration)}
					</p>
					<p>
						<span>Created: </span>
						{formatDate(creationDate)}
					</p>
				</div>
				<p className={styles.cardButtons}>
					<Link to={id}>
						<Button label='SHOW COURSE' className={styles.cardShowButton} />
					</Link>
					{isAdminUser() ? (
						<>
							<Button label='delete' onClick={handleDeleteCourse} className={classnames(buttonStyle, styles.cardDeleteButton)} />
							<Button label='edit' onClick={handleEditCourse} className={classnames(buttonStyle, styles.cardEditButton)} />
						</>
					) : null}
				</p>
			</div>
			<div />
		</div>
	);
}

export default CourseCard;
