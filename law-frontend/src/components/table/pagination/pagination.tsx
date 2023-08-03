import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from '../../../scss/pagination.module.scss';

type Props = {
	count: number;
	page: number;
	totalCount: number;
	onChangePage: (newPage: number) => void;
};

export const Pagination = ({
	count,
	page,
	totalCount,
	onChangePage
}: Props) => {
	const onHandleClick = (selectedItem: { selected: number }) => {
		onChangePage(selectedItem.selected);
	};
	return (
		<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
			<div>
				<p className={styles.paginationInfo}>
					Результат от{' '}
					<span className="font-medium">
						{count * (page + 1) - count === 0
							? 1
							: count * (page + 1) - count}
					</span>{' '}
					до{' '}
					<span className="font-medium">
						{count * (page + 1) > totalCount
							? totalCount
							: count * (page + 1)}
					</span>{' '}
					из <span className="font-medium">{totalCount}</span>
				</p>
			</div>
			<div className="flex flex-col items-center my-12 pagination">
				<ReactPaginate
					previousLabel={'<'}
					nextLabel={'>'}
					breakLabel={'...'}
					forcePage={page}
					pageCount={Math.ceil(totalCount / count)}
					marginPagesDisplayed={1}
					pageRangeDisplayed={2}
					onPageChange={onHandleClick}
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
	);
};
