import { format } from 'date-fns';
import React from 'react';

import { IDocument } from '../../../types/Document.interface';

import styles from './document.module.scss';

type Props = {
	data?: IDocument;
};

const dataDetail = ({ data }: Props) => {
	return (
		<div className={styles.body}>
			<table>
				<thead>
					<tr>
						<th>Предмет договора</th>
						<th>Регистрационный номер</th>
						<th>Наименование организации</th>
						<th>Cумма</th>
						<th>Статус</th>
						<th>Служба инициатор</th>
						<th>Дата вступления в силу</th>
						<th>Дата окончания действия</th>
						<th>Документ</th>
					</tr>
				</thead>
				<tbody>
					{data ? (
						<tr>
							<td>{data.title}</td>
							<td>{data.number}</td>
							<td>{data.contrAgent}</td>
							<td>{data.price}</td>
							<td>{data.status}</td>
							<td>{data.initiators?.shortName}</td>
							<td>
								{format(new Date(data.createdAt), 'dd/LL/yyyy')}
							</td>
							<td>
								{format(new Date(data.endDate), 'dd/LL/yyyy')}
							</td>
							<td>
								<a
									href={`http://localhost:3333/api/${data?.filePath}`}
								>
									{data?.fileName}
								</a>
							</td>
						</tr>
					) : null}
				</tbody>
			</table>
		</div>
	);
};

export default dataDetail;
