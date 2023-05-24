import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './auth/authApi';
import { categoryApi } from './category/categoryApi';
import { documentApi } from './document/documentApi';
import { fileApi } from './file/fileApi';
import { serviceApi } from './service/serviceApi';
import themeSlice from './theme/themeSlice';

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[documentApi.reducerPath]: documentApi.reducer,
		[serviceApi.reducerPath]: serviceApi.reducer,
		[fileApi.reducerPath]: fileApi.reducer,
		[categoryApi.reducerPath]: categoryApi.reducer,
		theme: themeSlice
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			authApi.middleware,
			documentApi.middleware,
			serviceApi.middleware,
			fileApi.middleware,
			categoryApi.middleware
		)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
