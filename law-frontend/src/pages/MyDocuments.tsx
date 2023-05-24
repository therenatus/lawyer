import DocumentList from '../components/table/documentList/DocumentList';
import { useGetByInitiatorsQuery } from '../store/document/documentApi';

import { ErrorPage } from './Error';

type Props = {};

export const MyDocuments = (props: Props) => {
	const { data, isLoading, isError } = useGetByInitiatorsQuery();

	return (
		<>
			{isError && <ErrorPage />}
			{isLoading && <p>LOADING.....</p>}
			{data ? <DocumentList data={data} /> : null}
		</>
	);
};
