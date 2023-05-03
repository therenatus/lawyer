import React from 'react';

import DocumentList from '../components/table/documentList/DocumentList';
import { useGetAllQuery } from '../store/document/documentApi';

import { ErrorPage } from './Error';

type Props = {};

export const AllDocuments = (props: Props) => {
	const { data, isLoading, isError } = useGetAllQuery(10);

	return (
		<>
			{isError && <ErrorPage />}
			{isLoading && <p>LOADIN.....</p>}
			{data ? <DocumentList {...data} /> : null}
		</>
	);
};
