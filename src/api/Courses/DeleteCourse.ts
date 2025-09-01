import { backendUrl } from '../../const/AppConsts';
import { ParseResponseAsync } from '../../utils/ParseResponse';
import { isSuccessful } from '../../models/Data';
import type { Data } from '../../models/Data';

export async function deleteCourseApiAsync(
  token: string,
  id: string
): Promise<boolean> {
  try {
    const response = await fetch(`${backendUrl}/courses/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
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
