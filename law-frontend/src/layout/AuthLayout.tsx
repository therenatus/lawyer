import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useMeQuery } from '../store/auth/authApi';
import {Role} from "../types/role.enum";

const AuthLayout = ({allowRole}: any) => {
	const { data, isLoading } = useMeQuery();
  console.log(allowRole)
	if (isLoading) {
		return <p>LOADING...</p>;
	}
  console.log(data?.service.role.includes(allowRole));
	return data ? <Outlet /> : <Navigate to={'/login'} replace />;
};

export default AuthLayout;
