import { describe, test, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { screen } from '@testing-library/react';
import { testRender } from '../../../../../tests';
import CourseCard from '../CourseCard';

const props = {
	title: 'dummy-title',
	description: 'dummy-description',
	creationDate: '24/11/2023',
	authors: ['author1', 'author2'],
	duration: 120,
	id: ''
};

beforeEach(() => {
	testRender(<CourseCard {...props} />);
});

describe('CourseCard tests', () => {
	test('CourseCard should display title', () => {
		expect(screen.getByText(props.title)).toBeInTheDocument();
	});

	test('CourseCard should display description', () => {
		expect(screen.getByText(props.description)).toBeInTheDocument();
	});

	test('CourseCard should display creation date in the correct format', () => {
		const expectedCreationDate = '24.11.2023';
		expect(screen.getByText(expectedCreationDate)).toBeInTheDocument();
	});

	test('CourseCard should display authors list', () => {
		const expectedAuthorsList = 'author1, author2';
		expect(screen.getByText(expectedAuthorsList)).toBeInTheDocument();
	});

	test('CourseCard should display duration in the correct format', () => {
		const expectedDuration = '02:00 hours';
		expect(screen.getByText(expectedDuration)).toBeInTheDocument();
	});
});
