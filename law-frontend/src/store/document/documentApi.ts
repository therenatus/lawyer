import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import Cookies from 'js-cookie';

import { IDocument } from '../../types/Document.interface';
import { IDocumentResponse } from '../../types/DocumentResponce.interface';

const apiEndpoint = 'http://localhost:3333/api/document';

interface DocumentRes {
	document: IDocument;
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

export const documentApi = createApi({
	reducerPath: 'api',
	baseQuery,
	endpoints: (builder) => ({
		getAll: builder.query<IDocumentResponse, any>({
			query: (limit: number = 10, offset: number = 0) =>
				`?limit=${limit}&offset${offset}`
		}),
		getOne: builder.query<DocumentRes, string>({
			query: (id: string) => `/${id}`
		}),
		getByInitiators: builder.query<IDocumentResponse, void>({
			query: () => '/initiators'
		}),
		getExpires: builder.query<IDocumentResponse, void>({
			query: () => '/line'
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
