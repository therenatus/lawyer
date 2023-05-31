import { format } from 'date-fns';
import React from 'react';
import { BiCheck, BiTimer } from 'react-icons/bi';
import { GrDocumentMissing, GrDocumentVerified } from 'react-icons/gr';
import { Link } from 'react-router-dom';

import { IDocumentsResponse } from '../../../types/DocumentResponce.interface';
import { AdditionalTypeEnum } from '../../../types/aditionalType.enum';

import styles from './document.module.scss';

interface Props {
	data: IDocumentsResponse;
	searchQuery?: (arg: string) => void;
}

const DocumentList = ({ data, searchQuery }: Props) => {
	const deadline = (endDate: any) => {
		return Math.ceil(
			(new Date(endDate).getTime() - new Date().getTime()) /
				(1000 * 3600 * 24)
		);
	};

	return (
		<div className={styles.body}>
			<div className={styles.blockk}>
				<div>
					<label htmlFor="table-search">Поиск</label>
					<div>
						<div>
							<svg
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
									clipRule="evenodd"
								></path>
							</svg>
						</div>
						<input
							type="text"
							id="table-search"
							placeholder="Поиск"
							onChange={(e) =>
								searchQuery ? searchQuery(e.target.value) : null
							}
						/>
					</div>
				</div>
				<table>
					<thead>
						<tr>
							<th scope="col" className={styles.field}>
								Название
							</th>
							<th scope="col" className={styles.field}>
								Категория
							</th>
							<th scope="col" className={styles.field}>
								Номер
							</th>
							<th scope="col" className={styles.field}>
								Инициатор
							</th>
							<th scope="col" className={styles.field}>
								Конец
							</th>
							<th scope="col" className={styles.field}>
								Статус
							</th>
							<th scope="col" className={styles.field}>
								Доп
							</th>
						</tr>
					</thead>
					<tbody>
						{data &&
							data?.document.map((el) => {
								return (
									<tr key={el.id}>
										<th scope="row">
											<Link to={`/${el.id}`}>
												{el.title}
											</Link>
										</th>
										<td className={styles.field}>
											{el.category.name}
										</td>
										<td className={styles.field}>
											{el.number}
										</td>
										<td className={styles.field}>
											{el.initiators &&
												el.initiators.shortName}
										</td>
										<td
											className={
												deadline(el.endDate) <= 3 &&
												deadline(el.endDate) >= 0
													? styles.red
													: styles.field
											}
										>
											<p>
												{format(
													new Date(el.endDate),
													'dd/LL/yyyy'
												)}
											</p>
										</td>
										<td className={styles.status}>
											{el.status === 'todo' ? (
												<BiTimer
													className={styles.svg}
												/>
											) : (
												<BiCheck
													className={styles.svg}
												/>
											)}
										</td>
										<td className={styles.status}>
											{el.additionalDocuments.length ? (
												el.additionalDocuments[
													el.additionalDocuments
														.length - 1
												].type ===
												AdditionalTypeEnum.TERMINATE ? (
													<div
														className={styles.type}
													>
														<GrDocumentMissing
															className={`${styles.svg}`}
														/>

														<p>Расторгнут</p>
													</div>
												) : (
													<div
														className={styles.type}
													>
														<GrDocumentVerified
															className={`${styles.svg}`}
														/>

														<p>Продлен</p>
													</div>
												)
											) : (
												<></>
											)}
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default DocumentList;
