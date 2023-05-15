import React from 'react';
import { useParams } from 'react-router-dom';

import { useGetOneQuery } from '../../../store/document/documentApi';

import styles from './document.module.scss';

type Props = {};

const DocumentDetail = (props: Props) => {
	const { id } = useParams();
	const { data, isLoading } = useGetOneQuery(id ? id : '1');
	const document = data?.document;
	return (
		<div className={styles.body}>
			<table>
				<thead>
					<tr>
						<th>Предмет договора</th>
						<th>Номер</th>
						<th>Контрагент</th>
						<th>Статус</th>
						<th>Служба инициатор</th>
						<th>Дата публикации</th>
						<th>Дата конца</th>
						<th>Документ</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{document?.title}</td>
						<td>{document?.number}</td>
						<td>{document?.contrAgent}</td>
						<td>{document?.status}</td>
						<td>{document?.initiators?.shortName}</td>
						<td>{document?.createdAt}</td>
						<td>{document?.endDate}</td>
						<td>
							<a
								href={`http://localhost:3333/api/${document?.filePath}`}
							>
								{document?.fileName}
							</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default DocumentDetail;
