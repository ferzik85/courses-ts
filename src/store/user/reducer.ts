/* eslint-disable default-param-last */
import { LOGIN_USER, LOGOUT_USER } from './types';
import type { User } from '../../models/User';

export interface UserState {
  isAuth: boolean;
  name: string;
  email: string;
  token: string;
  role: string;
}

export const userInitialState: UserState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

const logoutUser = userInitialState;

function loginUser(state: UserState, user: User): UserState {
	return {
		...state,
		isAuth: true,
		...user,
	};
}

export const userReducer = (state = userInitialState, action: any) => {
	switch (action.type) {
		case LOGIN_USER:
			return loginUser(state, action.payload);

		case LOGOUT_USER:
			return logoutUser;

		default:
			return state;
	}
};
