import { LOGIN_USER, LOGOUT_USER } from './types';
import type { User } from '../../models/User';

export const loginUserAction = (payload: User) => ({ type: LOGIN_USER, payload });
export const logoutUserAction = () => ({ type: LOGOUT_USER });
