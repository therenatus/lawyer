import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useMeQuery } from '../store/auth/authApi';

const AuthLayout = ({ allowRole }: any) => {
	const { data, isLoading } = useMeQuery();
	if (isLoading) {
		return <p>LOADING...</p>;
	}
	if (!data) {
		return <Navigate to={'/login'} replace />;
	}
	return data?.service.role.includes(allowRole) ? (
		<Outlet />
	) : (
		<Navigate to={'/forbidden'} replace />
	);
};

export default AuthLayout;
