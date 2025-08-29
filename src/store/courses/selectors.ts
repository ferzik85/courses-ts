import { createSelector } from 'reselect';
import { getAuthors } from '../authors/selectors';
import type { RootState } from '../rootReducer';
import type { CourseState } from './reducer';
import type { AuthorState } from '../authors/reducer';

export const getCourses = (state: RootState) => state.courses;

export const getCoursesWithAuthorNames = createSelector([getCourses, getAuthors], 
	(courses: CourseState[], authors: AuthorState[]) =>
	courses.map((course: CourseState) => ({
		...course,
		authors: course.authors.map((authorId) => authors.find((author) => author.id === authorId)?.name ?? 'Unknown author'),
	}))
);

export const getCourseWithAuthorName = createSelector(
	[getCoursesWithAuthorNames, (_, courseId) => courseId],
	(courses, courseId) => courses.find((course) => course.id === courseId) ?? null
);

export const getCourse = createSelector(
	[getCourses, (_, courseId) => courseId],
	(courses: CourseState[], courseId: string) => courses.find((course) => course.id === courseId) ?? null
);
