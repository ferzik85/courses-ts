import { logoutUserAsync } from '../../api/User/LogoutUser';
import { logoutUserAction } from './actions';
import { removeActiveUserFromLocalStorage, userTokenIsSet, getUserToken } from '../../localStorage/StorageAccess';

export const logoutUser = () =>
	async function logoutUserFromDbAndStore(dispatch: any) {
		if (userTokenIsSet()) {
			const token = getUserToken();
			const ok = await logoutUserAsync(token);
			if (ok) {
				removeActiveUserFromLocalStorage();
				dispatch(logoutUserAction());
			}
		}
	};
