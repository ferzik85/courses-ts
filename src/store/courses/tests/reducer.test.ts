import { describe, test, expect } from 'vitest';
import { coursesReducer } from '../reducer';
import { saveCoursesAction, addCourseAction } from '../actions';
import { courses } from '../../../tests';

describe('Courses reducer tests', () => {
	test('Courses reducer should return the initial state', () => {
		expect(coursesReducer(undefined, {})).toEqual([]);
	});

	test('Courses reducer should handle ADD_COURSE and returns new state', () => {
		const expectedCourse = courses[1];
		expect(
			coursesReducer([courses[0]], addCourseAction(expectedCourse))
		).toEqual([courses[0], expectedCourse]);
	});

	test('Courses reducer should handle SAVE_COURSES and returns new state', () => {
		const expectedCourses = courses;
		expect(
			coursesReducer([courses[1]], saveCoursesAction(expectedCourses))
		).toEqual(expectedCourses);
	});
});
