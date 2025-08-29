import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';
import searchCourses from '../../utils/SearchCourses';
import { isAdmin } from '../../store/user/selectors';
import EmptyCourseList from '../EmptyCourseList/EmptyCourseList';
import { getCoursesWithAuthorNames } from '../../store/courses/selectors';
import styles from './Courses.module.css';

function Courses() {
	const [searchString, setSearchString] = useState(null);
	const handleSearchClick = useCallback((searchKey: any) => setSearchString(searchKey), [setSearchString]);
	const coursesWithAuthorNames = useSelector(getCoursesWithAuthorNames);
	const noCourses = coursesWithAuthorNames.length === 0;
	const filteredCourses = searchString ? searchCourses(searchString, coursesWithAuthorNames) : coursesWithAuthorNames;
	const isAdminUser = useSelector(isAdmin);

	const courseListElement = (
		<>
			<div className={styles.header}>
				<SearchBar onSearchClick={handleSearchClick} />
				{isAdminUser ? (
					<Link to='add'>
						<Button label='ADD NEW COURSE' />
					</Link>
				) : null}
			</div>
			{filteredCourses.map((course) => (
				<CourseCard
					key={course.id}
					id={course.id}
					title={course.title}
					description={course.description}
					creationDate={course.creationDate}
					duration={course.duration}
					authors={course.authors}
				/>
			))}
		</>
	);

	const renderCourses = () => (noCourses ? <EmptyCourseList /> : courseListElement);

	return <div className={styles.courses}>{renderCourses()}</div>;
}

export default Courses;
