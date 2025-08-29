/* eslint-disable default-param-last */
import { ADD_COURSE, UPDATE_COURSE, DELETE_COURSE, SAVE_COURSES } from './types';

export interface CourseState {
  id: string;
  title: string;
  description: string;
  creationDate: string; 
  duration: number;     
  authors: string[];
}

export const coursesInitialState: CourseState[] = [];

export const coursesReducer = (state = coursesInitialState, action: any) => {
	switch (action.type) {
		case SAVE_COURSES:
			return action.payload;

		case ADD_COURSE:
			return [...state, action.payload];

		case UPDATE_COURSE: {
			return state.map((course) => (course.id === action.payload.id ? action.payload : course));
		}

		case DELETE_COURSE:
			return state.filter((course) => course.id !== action.payload);

		default:
			return state;
	}
};
