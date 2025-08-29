import type { Course } from '../models/Course';

function searchCourses(
	value: string | null, 
	courses: readonly Course[]
):  readonly Course[] {
	if (value === null) return courses;
	const searchedValue = value.trim().toLowerCase();
	return courses.filter(course => course.title.toLowerCase().includes(searchedValue) || course.id.toLowerCase().includes(searchedValue));
}

export default searchCourses;
