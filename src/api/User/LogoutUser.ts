import { backendUrl } from '../../const/AppConsts';

export async function logoutUserAsync(token: string | null): Promise<boolean> {
  if (!token) return false;
  try {
    const response = await fetch(`${backendUrl}/logout`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
        Authorization: token
      }
    });
    return response.ok;
  } catch {
    // ignore
  }
  return false;
}
