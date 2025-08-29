import { backendUrl } from "../../const/AppConsts";
import type { Data } from "../../models/Data";
import type { Author } from "../../models/Author";
import { ParseResponseAsync } from "../../utils/ParseResponse";
import { isSuccessful } from "../../models/Data";

export interface AddAuthorResult {
  ok: boolean;
  author: Author | null;
}

export async function addAuthorApiAsync(
	token: string, 
	author: string): Promise<AddAuthorResult> {
	try {
		const response = await fetch(`${backendUrl}/authors/add`, {
			method: 'POST',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
				accept: '*/*',
			},
			body: JSON.stringify({
				name: author,
			}),
		});
		const data = await ParseResponseAsync<Data<Author>>(response);
		const ok = response.ok && isSuccessful(data);
		return {
			ok,
			author: ok ? data.result : null
		};
	} catch {
		// ignore
	}
	return {
		ok: false,
		author: null,
	};
}
