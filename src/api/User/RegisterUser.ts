import { backendUrl } from "../../const/AppConsts";
import type { Data } from "../../models/Data";
import { ParseResponseAsync } from "../../utils/ParseResponse";
import { isSuccessful } from "../../models/Data";

export async function registerUserAsync(
	name: string, 
	email: string, 
	password: string): Promise<boolean> {
	try {
		const response = await fetch(`${backendUrl}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				accept: '*/*',
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		});
		const data = await ParseResponseAsync<Data<string>>(response);
		return response.ok && isSuccessful(data);
	} catch {
		// ignore
	}
	return false;
}
