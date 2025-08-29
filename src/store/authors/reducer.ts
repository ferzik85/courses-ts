/* eslint-disable default-param-last */
import { ADD_AUTHOR, DELETE_AUTHOR, SAVE_AUTHORS } from './types';

export interface AuthorState {
    id: string;
    name: string;
}

export const authorsInitialState: AuthorState[] = [];

export const authorsReducer = (state = authorsInitialState, action: any) => {
	switch (action.type) {
		case SAVE_AUTHORS:
			return action.payload;

		case ADD_AUTHOR:
			return [...state, action.payload];

		case DELETE_AUTHOR:
			return state.filter((author) => author.id !== action.payload);

		default:
			return state;
	}
};
