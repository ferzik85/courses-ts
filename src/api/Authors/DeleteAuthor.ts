import { backendUrl } from '../../const/AppConsts';
import type { Data } from '../../models/Data';
import { ParseResponseAsync } from '../../utils/ParseResponse';
import { isSuccessful } from '../../models/Data';

export async function deleteAuthorApiAsync(
	token: string | null,
	id: string
): Promise<boolean> {
	try {
		const response = await fetch(`${backendUrl}/authors/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: token ?? '',
				'Content-Type': 'application/json',
				accept: '*/*'
			}
		});
		const data = await ParseResponseAsync<Data<string>>(response);
		return response.ok && isSuccessful(data);
	} catch {
		// ignore
	}
	return false;
}
