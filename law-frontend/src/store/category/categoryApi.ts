import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import Cookies from 'js-cookie';

interface ICategory {
	name: string;
	index: string;
	id: string;
}

const baseQuery = fetchBaseQuery({
	baseUrl: process.env.REACT_APP_BASE_URL,
	prepareHeaders: (headers, { getState }) => {
		// const token = (getState() as { auth: { token: string } }).auth.token;
		const token = Cookies.get('authToken');
		headers.set('Authorization', `Bearer ${token}`);
		return headers;
	}
});

export const categoryApi = createApi({
	reducerPath: 'category',
	baseQuery,
	endpoints: (builder) => ({
		getAllCategories: builder.query<ICategory[], void>({
			query: () => '/category'
		})
	})
});

export const { useGetAllCategoriesQuery } = categoryApi;
