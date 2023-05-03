import { format } from 'date-fns';
import { BiCheck, BiTimer } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import { IDocumentResponse } from '../../../types/DocumentResponce.interface';

import styles from './document.module.scss';

const DocumentList = (data: IDocumentResponse) => {
	const deadline = (endDate: any) => {
		const a = Math.ceil(
			(new Date(endDate).getTime() - new Date().getTime()) /
				(1000 * 3600 * 24)
		);
		console.log(a);
		return a.toString();
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
											{el.number}
										</td>
										<td className={styles.field}>
											{el.initiators &&
												el.initiators.shortName}
										</td>
										<td
											className={
												deadline(el.endDate) <= '3' &&
												deadline(el.endDate) > '0'
													? styles.red
													: styles.field
											}
										>
											<p>
												{format(
													new Date(el.endDate),
													'P'
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
