import { ADD_AUTHOR, DELETE_AUTHOR, SAVE_AUTHORS } from './types';
import type { Author } from '../../models/Author';

export const addAuthorAction = (payload: Author) => ({ type: ADD_AUTHOR, payload });
export const deleteAuthorAction = (payload: string) => ({ type: DELETE_AUTHOR, payload });
export const saveAuthorsAction = (payload: Author[]) => ({ type: SAVE_AUTHORS, payload });
