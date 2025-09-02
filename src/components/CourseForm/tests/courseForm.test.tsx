import '@testing-library/jest-dom/vitest';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, cleanup } from '@testing-library/react';
import { testRender, authors, click } from '../../../tests';
import CourseForm from '../CourseForm';
import AuthorItemStyles from '../components/AuthorItem/AuthorItem.module.css';
//import type { AppDispatch } from '../../../store';

const getAuthorItems = (authorsPanel: string): HTMLCollectionOf<Element> => {
  const parent = screen.getByText(authorsPanel).parentElement as HTMLElement;
  return parent.getElementsByClassName(AuthorItemStyles.authorItem);
};

const getCourseAuthorItem = (authorPosition: number): HTMLElement => {
  const parent = screen.getByText('Course Authors').parentElement as HTMLElement;
  return parent.getElementsByClassName(AuthorItemStyles.authorItemName)[authorPosition] as HTMLElement;
};

const getAuthorItemName = (authorPosition: number): string =>
  getCourseAuthorItem(authorPosition)?.textContent ?? '';

const getAddAuthorButton = (authorName: string): HTMLElement =>
  screen.getByText(authorName).nextElementSibling as HTMLElement;

const deleteCourseAuthorButton = (authorPosition: number): HTMLElement =>
  getCourseAuthorItem(authorPosition).nextElementSibling as HTMLElement;

// NOTE: it is not recommended to mock React-Redux hooks (useDispatch),
// but it is required to check that dispatch is called by the task
// const mockDispatchFn = vi.fn();
// vi.mock('react-redux', () => ({
// 	...vi.requireActual('react-redux'),
// 	appDispatch: () => mockDispatchFn,
// }));

const dispatchSpy = vi.fn();
vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
  return {
    ...actual,
    useDispatch: () => dispatchSpy,
  };
});

beforeEach(() => {
	const { container } = testRender(<CourseForm />, { authors });
	screen.debug(container, Infinity); 
});

afterEach(cleanup);

describe('CourseForm tests', () => {
	test('CourseForm should show authors lists (all and course authors)', () => {
		const addNicolas = getAddAuthorButton('Nicolas Kim');
		const addAnna = getAddAuthorButton('Anna Sidorenko');
		click(addNicolas);
		click(addAnna);

		expect(getAuthorItems('Authors').length).toBe(authors.length);
		expect(getAuthorItems('Course Authors').length).toBe(2);
	});

	test('CourseForm "Create author" button click should call dispatch', () => {
		const createAuthorButton = screen.getByText('CREATE AUTHOR');
		click(createAuthorButton);

		const addAuthorThunkFunction = dispatchSpy.mock.calls[0][0].name;
		expect(addAuthorThunkFunction).toBe('addAuthorToDbAndStore');
	});

	test('CourseForm "Add author" button click should add an author to the course authors list', () => {
		const addAnna = getAddAuthorButton('Anna Sidorenko');
		click(addAnna);

		expect(getAuthorItemName(0)).toBe('Anna Sidorenko');
	});

	test('CourseForm "Delete author" button click should delete an author from the course list', () => {
		const addNicolas = getAddAuthorButton('Nicolas Kim');
		const addAnna = getAddAuthorButton('Anna Sidorenko');
		click(addNicolas);
		click(addAnna);
		const deleteAnna = deleteCourseAuthorButton(1);
		click(deleteAnna);

		expect(getAuthorItemName(0)).toBe('Nicolas Kim');
		expect(getAuthorItems('Course Authors').length).toBe(1);
	});
});
