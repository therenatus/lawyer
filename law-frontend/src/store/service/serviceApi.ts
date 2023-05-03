import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import Cookies from 'js-cookie';

import { IUser, TUserCreate, TUserEdit } from '../../types/user.interface';

const baseUrl = 'http://localhost:3333/api';

export interface IServiceResponse {
	service: ServiceType[];
	token: string;
}

export type ServiceType = {
	id: string;
	code: number;
	name: string;
	shortName: string;
	documents: string;
	initiator: string;
	role: string;
};

const baseQuery = fetchBaseQuery({
	baseUrl,
	prepareHeaders: (headers, { getState }) => {
		const token = Cookies.get('authToken');
		headers.set('Authorization', `Bearer ${token}`);
		return headers;
	}
});

export const serviceApi = createApi({
	reducerPath: 'service',
	baseQuery,
	endpoints: (builder) => ({
		getAllServices: builder.query<IUser[], void>({
			query: () => '/service/all'
		}),
		addService: builder.mutation<IUser, TUserCreate>({
			query: (data) => ({
				url: '/service',
				method: 'POST',
				body: data
			})
		}),
		updateService: builder.mutation<IUser, TUserEdit>({
			query: (data) => ({
				url: '/service',
				method: 'PATCH',
				body: data
			})
		})
	})
});

export const {
	useGetAllServicesQuery,
	useAddServiceMutation,
	useUpdateServiceMutation
} = serviceApi;
