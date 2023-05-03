import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useCreateDocumentMutation } from '../../../store/document/documentApi';
import { useUploadFileMutation } from '../../../store/file/fileApi';
import {
	IServiceResponse,
	ServiceType,
	useGetAllServicesQuery
} from '../../../store/service/serviceApi';

// import { useGetAllQuery } from '../../../store/document/documentApi';
import styles from './document.module.scss';

type Props = {};

interface ISelect {
	id: number;
	value: string;
}

const documentType: ISelect[] = [
	{ id: 0, value: 'Договора' },
	{ id: 1, value: 'Доп соглашение' },
	{ id: 2, value: 'Соглашение о расторжении' }
];

const documentSubType: ISelect[] = [
	{ id: 0, value: 'Расходный' },
	{ id: 1, value: 'Доходный' },
	{ id: 2, value: 'Без оплаты' }
];

interface FormValues {
	name: string;
	contrAgent: string;
	price: string;
	service: string;
	type: string;
	subType: string;
	endDAte: string;
	file: FileList;
}

interface IFile {
	url: string;
	path: string;
}
const CreateDocument = (props: Props) => {
	const [file, setFile] = useState<IFile[]>([]);
	const [document, setDocument] = useState();
	const {
		data: serviceData,
		isLoading: serviceLoading,
		isSuccess: serviceSuccess
	} = useGetAllServicesQuery();
	const [create, { isLoading, isError }] = useCreateDocumentMutation();

	const schema = yup.object().shape({
		title: yup.string().required('Title is required'),
		contrAgent: yup.string().required('Title is required'),
		price: yup.string().required('Title is required'),
		service: yup.string().required('Title is required'),
		type: yup.string().required('Title is required'),
		endDate: yup.string().required('Title is required'),
		file: yup.mixed().required('A file is required')
	});
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(schema)
	});

	const typeFields = watch('type');
	const toUpload: FileList = watch('file');

	useEffect(() => {
		const formData = new FormData();
		if (toUpload && toUpload[0] != undefined) {
			formData.append('files', toUpload[0]);
			axios
				.post('http://localhost:3333/api/file/upload', formData, {
					headers: {
						'Content-Type': 'multipart/form-data, charset=utf-8'
					},
					responseEncoding: 'utf-8'
				})
				.then((res) => {
					setFile((prev) => [...prev, res.data[0]]);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [toUpload]);
	const onSubmit = (e: any) => {
		e.file = file[0];
		console.log(e);
		create(e);
	};

	return (
		<div className={styles.body}>
			<div>
				<div>
					<div>
						<h2>Создать</h2>
					</div>
					<div>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div>
								<div>
									<div>
										<label>
											Предмет договара
											<abbr title="required">*</abbr>
										</label>
										<input
											placeholder="Название"
											type="text"
											id="integration_shop_name"
											{...register('title')}
										/>

										{errors.title &&
											errors.title.message && (
												<>{errors.title.message}</>
											)}
									</div>
									<div>
										<label>
											Контрагент
											<abbr title="required">*</abbr>
										</label>
										<input
											placeholder="Контрагент"
											type="text"
											id="integration_shop_name"
											{...register('contrAgent', {
												required:
													'Поле обязательно к заполнению'
											})}
										/>
										{errors.contrAgent?.message && (
											<>{errors.contrAgent.message}</>
										)}
									</div>
									<div>
										<label>
											Сумма
											<abbr title="required">*</abbr>
										</label>
										<input
											placeholder="Сумма"
											type="text"
											id="integration_shop_name"
											{...register('price', {
												required:
													'Поле обязательно к заполнению'
											})}
										/>
										{errors.price?.message && (
											<>{errors.price.message}</>
										)}
									</div>
									<div>
										<label>
											Название службы
											<abbr title="required">*</abbr>
										</label>
										<select
											defaultValue={''}
											className={styles.select}
											{...register('service', {
												required:
													'Поле обязательно к заполнению'
											})}
										>
											{errors.service?.message && (
												<>{errors.service.message}</>
											)}
											<option value="" disabled>
												Выберите службу
											</option>
											{serviceData &&
												serviceData.map((el) => (
													<option
														key={el.id}
														value={el.id}
													>
														{el.shortName}
													</option>
												))}
										</select>
									</div>
									<div>
										<label>
											Тип документа
											<abbr title="required">*</abbr>
										</label>
										<select
											defaultValue={''}
											className={styles.select}
											{...register('type', {
												required:
													'Поле обязательно к заполнению'
											})}
										>
											{errors.type?.message && (
												<>{errors.type.message}</>
											)}
											<option value="" disabled>
												Выберите тип
											</option>
											{documentType.map((el) => (
												<option
													value={el.id}
													key={el.id}
												>
													{el.value}
												</option>
											))}
										</select>
									</div>
									{Number(typeFields) === 0 && (
										<div>
											<label>
												Вид документа
												<abbr title="required">*</abbr>
											</label>
											<select
												defaultValue={''}
												className={styles.select}
												{...register('subType')}
											>
												{errors.type?.message && (
													<>{errors.type.message}</>
												)}
												<option value="" disabled>
													Выберите вид
												</option>
												{documentSubType.map((el) => (
													<option
														value={el.id}
														key={el.id}
													>
														{el.value}
													</option>
												))}
											</select>
										</div>
									)}
									<div>
										<div>
											<label>
												Конец
												<abbr title="required">*</abbr>
											</label>
											<div>
												<input
													type="datetime-local"
													placeholder="Select a date"
													{...register('endDate', {
														required:
															'Поле обязательно к заполнению'
													})}
												/>

												{errors.endDate?.message && (
													<>
														{errors.endDate.message}
													</>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className={styles.uploadFile}>
								<label className={styles.header}>TWXT</label>
								<label
									htmlFor="dropzone-file"
									className={styles.inputField}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
										/>
									</svg>

									<h2>Выбрать файл</h2>

									<p>Загрузите файл в формате .pdf</p>

									<input
										id="dropzone-file"
										type="file"
										className="hidden"
										{...register('file', {
											required: 'Not Empty'
										})}
									/>
									{errors.file?.message && (
										<>{errors.file.message}</>
									)}
								</label>

								<section>
									<ul id="gallery">
										<li id="empty">
											<img
												src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
												alt="no data"
											/>
											<span>Файл не выбран</span>
										</li>
									</ul>
								</section>
							</div>
							<div className={styles.buttonBlock}>
								<button type="submit">Сохранить</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateDocument;
