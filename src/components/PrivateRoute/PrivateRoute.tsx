import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { isAdmin } from '../../store/user/selectors';

export interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
	const isAdminUser = useSelector(isAdmin);
	return isAdminUser ? children : <Navigate to='/courses' />;
}


