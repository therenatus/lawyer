import React from 'react';

import DocumentList from '../components/table/documentList/DocumentList';
import { useGetExpiresQuery } from '../store/document/documentApi';

import { ErrorPage } from './Error';

type Props = {};

export const ExpiresDocuments = (props: Props) => {
	const { data, isLoading, isError } = useGetExpiresQuery();

	return (
		<>
			{isError && <ErrorPage />}
			{isLoading && <p>LOADING.....</p>}
			{data ? <DocumentList {...data} /> : null}
		</>
	);
};
