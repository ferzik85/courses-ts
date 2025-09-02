import '@testing-library/jest-dom/vitest';
import { describe, test, expect } from 'vitest';
import { Routes, Route } from 'react-router';
import { screen } from '@testing-library/react';
import { courses, authors, testRender, click } from '../../../tests';
import Courses from '../Courses';
import CourseForm from '../../CourseForm/CourseForm';
import { PrivateRoute } from '../../PrivateRoute';
import courseCardStyles from '../components/CourseCard/CourseCard.module.css';

describe('Courses tests', () => {
	test('Courses should display amount of CourseCards equal to number of courses', () => {
		const { container } = testRender(<Courses />, { authors, courses });
		expect(container.getElementsByClassName(courseCardStyles.card).length).toBe(
			courses.length
		);
	});

	test('CourseForm should be shown after a click on the "Add new course" button', () => {
		const adminUser = { role: 'admin' };
		testRender(
			<Routes>
				<Route path="/courses" element={<Courses />} />
				<Route
					path="/courses/add"
					element={
						<PrivateRoute>
							<CourseForm />
						</PrivateRoute>
					}
				/>
			</Routes>,
			{ user: adminUser, initialEntries: ['/courses'] }
		);
		const linkToAddNewCourse = screen.getByText('ADD NEW COURSE').parentElement;
		click(linkToAddNewCourse);

		expect(screen.getByText('Create Course').parentElement?.className).toMatch(
			/courseForm/
		);
	});
});
