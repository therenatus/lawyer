import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

import { IUser, TUserCreate } from '../../types/user.interface';

const apiEndpoint = 'http://localhost:3333/api';

interface AuthResponse {
	service: IUser;
	token: string;
}

interface AuthRequest {
	shortName: string;
	password: string;
}

const baseQuery = fetchBaseQuery({
	baseUrl: apiEndpoint,
	prepareHeaders: (headers, { getState }) => {
		// const token = (getState() as { auth: { token: string } }).auth.token;
		const token = Cookies.get('authToken');
		headers.set('Authorization', `Bearer ${token}`);
		return headers;
	}
});

export const authApi = createApi({
	reducerPath: 'auth',
	baseQuery,
	endpoints: (builder) => ({
		login: builder.mutation<AuthResponse, AuthRequest>({
			query: (body) => ({
				url: '/auth/login',
				method: 'POST',
				body
			})
		}),
		register: builder.mutation<AuthResponse, TUserCreate>({
			query: (body) => ({
				url: '/auth/registration',
				method: 'POST',
				body
			})
		}),
		changePassword: builder.mutation({
			query: (body) => ({
				url: '/auth/change-password',
				method: 'PATCH',
				body
			})
		}),
		me: builder.query<AuthResponse, void>({
			query: () => '/auth/me'
		})
	})
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useMeQuery,
	useChangePasswordMutation
} = authApi;
