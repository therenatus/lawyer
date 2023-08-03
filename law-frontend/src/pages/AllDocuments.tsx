import React, { useState } from 'react';

import { Loader } from '../components/Loader';
import DocumentList from '../components/table/documentList/DocumentList';
import { Pagination } from '../components/table/pagination/pagination';
import { BodyLayout } from '../layout/BodyLayout';
import { useGetAllQuery } from '../store/document/documentApi';

import { ErrorPage } from './Error';

export const AllDocuments = () => {
	const [page, setPage] = useState<number>(1);
	const [searchQuery, setSearchQuery] = useState<string>();
	const limit = 2;
	const { data, isLoading, isError } = useGetAllQuery({
		limit,
		page,
		q: searchQuery
	});

	const handlePageChange = (e: number) => {
		setPage(e + 1);
	};

	const search = (arg: string) => {
		setSearchQuery(arg);
		setPage(1);
	};

	return (
		<BodyLayout>
			{isError && <ErrorPage />}
			{isLoading && <Loader />}
			{data ? (
				<>
					<DocumentList data={data} searchQuery={search} />
					{data.pagination.totalCount > limit ? (
						<Pagination
							count={data.pagination.count}
							page={data.pagination.page}
							totalCount={data.pagination.totalCount}
							onChangePage={handlePageChange}
						/>
					) : null}
				</>
			) : null}
		</BodyLayout>
	);
};
