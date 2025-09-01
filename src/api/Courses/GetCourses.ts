import { backendUrl } from '../../const/AppConsts';
import { ParseResponseAsync } from '../../utils/ParseResponse';
import { isSuccessful } from '../../models/Data';
import type { Course } from '../../models/Course';
import type { Data } from '../../models/Data';

export interface GetCoursesResult {
	ok: boolean;
	courses: Course[];
}

export async function getCoursesApiAsync(): Promise<GetCoursesResult> {
	try {
		const response = await fetch(`${backendUrl}/courses/all`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				accept: '*/*'
			}
		});
		const data = await ParseResponseAsync<Data<Course[]>>(response);
		const ok = response.ok && isSuccessful(data);
		return {
			ok,
			courses: ok ? (data.result ?? []) : []
		};
	} catch {
		// ignore
	}
	return {
		ok: false,
		courses: []
	};
}
