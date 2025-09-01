import { backendUrl } from '../../const/AppConsts';
import type { Data } from '../../models/Data';
import type { Author } from '../../models/Author';
import { ParseResponseAsync } from '../../utils/ParseResponse';
import { isSuccessful } from '../../models/Data';

export interface GetAuthorsResult {
  ok: boolean;
  authors: Author[];
}

export async function getAuthorsApiAsync(): Promise<GetAuthorsResult> {
  try {
    const response = await fetch(`${backendUrl}/authors/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*'
      }
    });
    const data = await ParseResponseAsync<Data<Author[]>>(response);
    const ok = response.ok && isSuccessful(data);

    return {
      ok,
      authors: ok ? (data.result ?? []) : []
    };
  } catch {
    // ignore
  }
  return {
    ok: false,
    authors: []
  };
}
