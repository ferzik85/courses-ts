import { getCoursesApiAsync } from '../../api/Courses/GetCourses';
import { addCourseApiAsync } from '../../api/Courses/AddCourse';
import { deleteCourseApiAsync } from '../../api/Courses/DeleteCourse';
import { updateCourseApiAsync } from '../../api/Courses/UpdateCourse';
import { saveCoursesAction, addCourseAction, deleteCourseAction, updateCourseAction } from './actions';
import { userTokenIsSet, getUserToken } from '../../localStorage/StorageAccess';
import type { Course } from '../../models/Course';

export const getCourses = () =>
	async function saveCoursesFromDbToStore(dispatch: any) {
		const result = await getCoursesApiAsync();
		if (result.ok) dispatch(saveCoursesAction(result.courses));
	};

export const addCourse = (course: Course) =>
	async function addCourseToDbAndStore(dispatch: any) {
		if (userTokenIsSet()) {
			const token = getUserToken();
			const result = await addCourseApiAsync(token, course);
			if (result.ok && result.course) dispatch(addCourseAction(result.course));
		}
	};

export const deleteCourse = (id: string) =>
	async function deleteCourseFromDbAndStore(dispatch: any) {
		if (userTokenIsSet()) {
			const token = getUserToken();
			const ok = await deleteCourseApiAsync(token, id);
			if (ok) dispatch(deleteCourseAction(id));
		}
	};

export const updateCourse = (course: Course) =>
	async function updateCourseInDbAndStore(dispatch: any) {
		if (userTokenIsSet()) {
			const token = getUserToken();
			const result = await updateCourseApiAsync(token, course);
			if (result.ok && result.course) dispatch(updateCourseAction(result.course));
		}
	};
