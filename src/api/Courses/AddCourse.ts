import { backendUrl } from '../../const/AppConsts';
import { ParseResponseAsync } from '../../utils/ParseResponse';
import { isSuccessful } from '../../models/Data';
import type { Course } from '../../models/Course';
import type { Data } from '../../models/Data';

export interface AddCourseResult {
	ok: boolean;
	course: Course | null;
}

export async function addCourseApiAsync(
	token: string,
	course: Course
): Promise<AddCourseResult> {
	try {
		const response = await fetch(`${backendUrl}/courses/add`, {
			method: 'POST',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
				accept: '*/*'
			},
			body: JSON.stringify(course)
		});
		const data = await ParseResponseAsync<Data<Course>>(response);
		const ok = response.ok && isSuccessful(data);
		return {
			ok,
			course: ok ? (data?.result ?? null) : null
		};
	} catch {
		// ignore
	}
	return {
		ok: false,
		course: null
	};
}
