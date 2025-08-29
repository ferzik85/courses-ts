import type { RootState } from '../rootReducer';

export const getUser = (state: RootState) => state.user.name;
export const isAdmin = (state: RootState) => state.user.role?.toLowerCase() === 'admin';
