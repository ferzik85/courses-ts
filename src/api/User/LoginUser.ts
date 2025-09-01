import { backendUrl } from '../../const/AppConsts';
import type { Data } from '../../models/Data';
import type { User } from '../../models/User';
import { ParseResponseAsync } from '../../utils/ParseResponse';
import { isSuccessful } from '../../models/Data';

export interface LoginResult {
	ok: boolean;
	user: User | null;
}

export async function loginUserAsync(
	email: string,
	password: string
): Promise<LoginResult> {
	try {
		const response = await fetch(`${backendUrl}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				accept: '*/*'
			},
			body: JSON.stringify({
				email,
				password
			})
		});
		const data = await ParseResponseAsync<Data<string>>(response);
		return {
			ok: response.ok && isSuccessful(data),
			user: {
				name: data?.user.name ?? '',
				email: data?.user.email ?? '',
				token: data?.result ?? '',
				password: '',
				role: ''
			}
		};
	} catch {
		// ignore
	}
	return {
		ok: false,
		user: null
	};
}
