import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import Cookies from 'js-cookie';

interface IUploadResponse {
	url: string;
	name: string;
}

const baseQuery = fetchBaseQuery({
	baseUrl: process.env.REACT_APP_BASE_URL,
	prepareHeaders: (headers, { getState }) => {
		const token = Cookies.get('authToken');
		headers.set('Authorization', `Bearer ${token}`);
		return headers;
	}
});

export const fileApi = createApi({
	reducerPath: 'file',
	baseQuery,
	endpoints: (builder) => ({
		uploadFile: builder.mutation<IUploadResponse, FormData>({
			query: (formData) => ({
				url: '/file/upload',
				method: 'POST',
				body: formData
			})
		})
	})
});

export const { useUploadFileMutation } = fileApi;
