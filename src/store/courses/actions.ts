import { ADD_COURSE, UPDATE_COURSE, DELETE_COURSE, SAVE_COURSES } from './types';
import type { Course } from '../../models/Course';

export const addCourseAction = (payload: Course) => ({ type: ADD_COURSE, payload });
export const updateCourseAction = (payload: Course) => ({ type: UPDATE_COURSE, payload });
export const deleteCourseAction = (payload: string) => ({ type: DELETE_COURSE, payload });
export const saveCoursesAction = (payload: Course[]) => ({ type: SAVE_COURSES, payload });
