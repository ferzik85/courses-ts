import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router';
import Button from '../../common/Button/Button';
import Duration from '../../common/Duration/Duration';
import formatDate from '../../utils/FormatDate';
import formatAuthors from '../../utils/FormatAuthors';
import { getCourseWithAuthorName } from '../../store/courses/selectors';
import styles from './CourseInfo.module.css';

function CourseInfo() {
	const params = useParams();
	const foundCourse = useSelector((state) => getCourseWithAuthorName(state, params.courseId));
	const courseIsFound = foundCourse != null;

	const courseElement = (course: any) => (
		<>
			<div className={styles.courseInfoTitle}>{course.title}</div>
			<div className={styles.courseDescription}>
				<div>Description:</div>
				<div className={styles.courseDescriptionLayout}>
					<div className={styles.courseDescriptionText}>{course.description}</div>
					<div className={styles.courseDescriptionMetadata}>
						<div>
							<span>ID:</span>
							<span>{course.id}</span>
						</div>
						<div>
							<span>Duration:</span>
							<Duration duration={course.duration} />
						</div>
						<div>
							<span>Created:</span>
							<span>{formatDate(course.creationDate)}</span>
						</div>
						<div>
							<span>Authors:</span>
							<span>{formatAuthors(course.authors)}</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);

	return (
		<div className={styles.courseInfo}>
			{courseIsFound ? courseElement(foundCourse) : <div className={styles.courseIsNotFound}>Course is not found</div>}
			<div>
				<Link to='/courses'>
					<Button label='BACK' className={styles.courseDescriptionButton} />
				</Link>
			</div>
		</div>
	);
}

export default CourseInfo;
