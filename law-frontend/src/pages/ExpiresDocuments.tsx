import React from 'react';

import DocumentList from '../components/table/documentList/DocumentList';
import { BodyLayout } from '../layout/BodyLayout';
import { useGetExpiresQuery } from '../store/document/documentApi';

import { ErrorPage } from './Error';

type Props = {};

export const ExpiresDocuments = (props: Props) => {
	const { data, isLoading, isError } = useGetExpiresQuery();
	console.log(data);

	return (
		<>
			{isError && <ErrorPage />}
			{isLoading && <p>LOADING.....</p>}
			{data ? (
				<BodyLayout>
					<DocumentList data={data} />
				</BodyLayout>
			) : null}
		</>
	);
};
