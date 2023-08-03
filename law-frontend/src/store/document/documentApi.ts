import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import Cookies from 'js-cookie';

import { IDocument } from '../../types/Document.interface';
import {
	IDocumentResponse,
	IDocumentsResponse
} from '../../types/DocumentResponce.interface';

const apiEndpoint = 'http://localhost:3333/api/document';

interface DocumentRes {
	document: IDocument;
	pagination: {
		totalCount: number;
		count: number;
		page: number;
	};
}

const baseQuery = fetchBaseQuery({
	baseUrl: `${process.env.REACT_APP_BASE_URL}/document`,
	prepareHeaders: (headers, { getState }) => {
		// const token = (getState() as { auth: { token: string } }).auth.token;
		const token = Cookies.get('authToken');
		headers.set('Authorization', `Bearer ${token}`);
		return headers;
	}
});

export const documentApi = createApi({
	reducerPath: 'api',
	baseQuery,
	endpoints: (builder) => ({
		getAll: builder.query<IDocumentsResponse, any>({
			query: ({ limit, page, q }) =>
				`?limit=${limit}&offset=${page}${q ? `&q=${q}` : ''}`
		}),
		getOne: builder.query<IDocumentResponse, string>({
			query: (id: string) => `/${id}`
		}),
		getByInitiators: builder.query<IDocumentsResponse, void>({
			query: () => '/initiators'
		}),
		getExpires: builder.query<IDocumentsResponse, any>({
			query: ({ limit, page, q }) =>
				`/line?limit=${limit}&offset=${page}${q ? `&q=${q}` : ''}`
		}),
		createDocument: builder.mutation({
			query: (data) => ({
				url: '/',
				method: 'POST',
				body: data
			})
		})
	})
});

export const {
	useGetAllQuery,
	useCreateDocumentMutation,
	useGetOneQuery,
	useGetExpiresQuery,
	useGetByInitiatorsQuery
} = documentApi;
