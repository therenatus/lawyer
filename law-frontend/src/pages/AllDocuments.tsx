import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import DocumentList from '../components/table/documentList/DocumentList';
import { BodyLayout } from '../layout/BodyLayout';
import styles from '../scss/pagination.module.scss';
import { useGetAllQuery } from '../store/document/documentApi';

import { ErrorPage } from './Error';

export const AllDocuments = () => {
	const [page, setPage] = useState<number>(1);
	const [searchQuery, setSearchQuery] = useState<string>();
	const { data, isLoading, isError } = useGetAllQuery({
		limit: 3,
		page,
		q: searchQuery
	});

	const handlePageChange = (p: any) => {
		setPage(p.selected + 1);
	};

	const search = (arg: string) => {
		setSearchQuery(arg);
	};

	return (
		<>
			{isError && <ErrorPage />}
			{isLoading && <p>LOADING.....</p>}
			{data ? (
				<BodyLayout>
					<DocumentList data={data} searchQuery={search} />
					{data.pagination?.totalCount > 0 && (
						<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
							<div>
								<p className={styles.paginationInfo}>
									Результат от{' '}
									<span className="font-medium">
										{data.pagination.count *
											(data.pagination.page + 1) -
											data.pagination.count}
									</span>{' '}
									до{' '}
									<span className="font-medium">
										{data.pagination.count *
											(data.pagination.page + 1) >
										data.pagination.totalCount
											? data.pagination.totalCount
											: data.pagination.count *
											  (data.pagination.page + 1)}
									</span>{' '}
									из{' '}
									<span className="font-medium">
										{data.pagination.totalCount}
									</span>
								</p>
							</div>
							<div className="flex flex-col items-center my-12 pagination">
								<ReactPaginate
									previousLabel={'<'}
									nextLabel={'>'}
									breakLabel={'...'}
									forcePage={data.pagination.page}
									pageCount={Math.ceil(
										data.pagination.totalCount /
											data.pagination.count
									)}
									marginPagesDisplayed={1}
									pageRangeDisplayed={2}
									onPageChange={handlePageChange}
									containerClassName={
										'flex text-gray-700 items-center justify-around'
									}
									pageClassName={
										'flex h-12 font-medium rounded-full bg-gray-200 ml-5'
									}
									activeClassName={'selected'}
									breakClassName={'ml-5'}
									pageLinkClassName={
										'w-12 md:flex justify-center items-center hidden cursor-pointer leading-5 transition duration-150 ease-in rounded-full'
									}
								/>
							</div>
						</div>
					)}
				</BodyLayout>
			) : null}
		</>
	);
};
