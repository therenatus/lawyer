import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsCheck, BsCheckCircleFill, BsFillPencilFill } from 'react-icons/bs';
import * as yup from 'yup';

import {
	useGetAllServicesQuery,
	useUpdateServiceMutation
} from '../../../store/service/serviceApi';
import { IUser, TUserEdit } from '../../../types/user.interface';

import styles from './service-list.module.scss';

type Props = {};

// const schema = yup.object().shape({
// 	name: yup.string().required('Поле не должно быть пустым'),
// 	shortName: yup.string().required('Поле не должно быть пустым'),
// 	code: yup.string().required('Поле не должно быть пустым')
// });

const ServiceList = (props: Props) => {
	const { data, isLoading, isError } = useGetAllServicesQuery();
	const [update] = useUpdateServiceMutation();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<IUser>();
	const ref = useRef(null);
	const [edit, setEdit] = useState<boolean>(false);
	const [currentService, setCurrentService] = useState<IUser | null>();
	const [rowId, setRowId] = useState<string>('');

	const toChangeData = (id: IUser) => {
		setEdit(!edit);
		if (!edit) {
			setRowId(id.id);
		} else {
			setRowId('');
		}
	};

	useEffect(() => {
		const ser = data?.find((el) => el.id === rowId);
		setCurrentService(ser);
	}, [rowId]);

	const onSubmit = (e: IUser) => {
		e.id = rowId;
		update(e);
		setRowId('');
		setEdit(false);
	};

	return (
		<div className={styles.body}>
			<h1>Список служб</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<table>
					<thead>
						<tr>
							<th className={styles.name}>Название службы</th>
							<th className={styles.shortName}>
								Инициалы службы
							</th>
							<th className={styles.code}>Код</th>
							<th className={styles.button}></th>
						</tr>
					</thead>
					<tbody>
						{data
							? data.map((el, idx) => (
									<tr
										key={el.id}
										className={
											el.id === rowId
												? styles.toChange
												: styles.staticc
										}
									>
										{rowId === el.id ? (
											<>
												<td>
													<input
														type="text"
														value={
															currentService?.name
														}
														{...register('name')}
													/>
												</td>
												<td>
													<input
														type="text"
														defaultValue={
															currentService?.shortName
														}
														{...register(
															'shortName'
														)}
													/>
												</td>
												<td>
													<input
														type="number"
														defaultValue={
															currentService?.code
														}
														{...register('code')}
													/>
												</td>
												<td className={styles.button}>
													<button type="submit">
														<BsCheckCircleFill
															onClick={() =>
																onSubmit
															}
														/>
													</button>
												</td>
											</>
										) : (
											<>
												<td>{el.name}</td>
												<td>{el.shortName}</td>
												<td>{el.code}</td>
												<td className={styles.button}>
													<BsFillPencilFill
														onClick={() =>
															toChangeData(el)
														}
													/>
												</td>
											</>
										)}
									</tr>
							  ))
							: null}
					</tbody>
				</table>
			</form>
		</div>
	);
};

export default ServiceList;
