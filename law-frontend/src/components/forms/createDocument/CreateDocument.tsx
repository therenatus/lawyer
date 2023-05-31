import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsFillTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';

import { useGetAllCategoriesQuery } from '../../../store/category/categoryApi';
import { useCreateDocumentMutation } from '../../../store/document/documentApi';
import { useGetAllServicesQuery } from '../../../store/service/serviceApi';

import styles from './document.module.scss';

interface ISelect {
	id: number;
	value: string;
}

const documentType: ISelect[] = [
	{ id: 1, value: 'Доходный' },
	{ id: 2, value: 'Расходный' },
	{ id: 3, value: 'Без оплаты' }
];

interface FormValues {
	title: string;
	contrAgent: string;
	price: string;
	service: string;
	type: string;
	subType: string;
	startDate: string;
	endDate: string;
	category: string;
	file: FileList;
}

interface IFile {
	url: string;
	name: string;
}

const CreateDocument = () => {
	const [file, setFile] = useState<IFile | null>(null);
	const navigate = useNavigate();
	const { data: serviceData } = useGetAllServicesQuery();

	const { data: categoryData } = useGetAllCategoriesQuery();

	const [create, { isError, isSuccess }] = useCreateDocumentMutation();
	interface AnyPresentValue {
		[index: number]: any;
	}

	const schema = yup.object().shape({
		title: yup.string().required('Обьязательное поле'),
		contrAgent: yup.string().required('Обьязательное поле'),
		price: yup.string().required('Обьязательное поле'),
		service: yup.string().required('Пожалуйста, выберите вариант'),
		type: yup.string().required('Пожалуйста, выберите вариант'),
		startDate: yup.string().required('Пожалуйста, выберите дату'),
		endDate: yup.string().required('Пожалуйста, выберите дату'),
		file: yup
			.mixed()
			.required('Пожалуйста, загрузите файл')
			.test(
				'require',
				'Пожалуйста, загрузите файл',
				(value: AnyPresentValue) => {
					return value && value[0];
				}
			)
	});
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors }
	} = useForm<FormValues>({
		resolver: yupResolver(schema)
	});

	let toUpload: FileList | undefined = watch('file');

	useEffect(() => {
		const formData = new FormData();
		if (toUpload && toUpload[0] !== undefined) {
			formData.append('files', toUpload[0]);
			axios
				.post(
					`${process.env.REACT_APP_BASE_URL}/file/upload`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data, charset=utf-8'
						},
						responseEncoding: 'utf-8'
					}
				)
				.then((res) => {
					setFile(res.data);
				})
				.catch(() => {
					toast.error('Произошла ощибка при загрузке файла');
				});
		}
	}, [toUpload]);
	const onSubmit = (e: any) => {
		e.file = file;
		console.log(e);
		create(e);
	};

	if (isError) {
		toast.error('Произошла ощибка');
	}

	if (isSuccess) {
		toast.success('Документ успешно сохранен');
		setTimeout(() => {
			navigate('/');
		}, 3000);
	}

	return (
		<div className={styles.body}>
			<ToastContainer theme={'colored'} className="h-fit" />
			<div>
				<div>
					<div>
						<h2>Создать документ</h2>
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
												<span className="h-5 text-red-500 mt-1 mb-3 block text-sm">
													{errors.title.message}
												</span>
											)}
									</div>
									<div>
										<label>
											Наименование организации
											<abbr title="required">*</abbr>
										</label>
										<input
											placeholder="Контрагент"
											type="text"
											id="integration_shop_name"
											{...register('contrAgent')}
										/>
										{errors.contrAgent?.message && (
											<span className="h-5 text-red-500 mt-1 mb-3 block text-sm">
												{errors.contrAgent.message}
											</span>
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
											{...register('price')}
										/>
										{errors.price?.message && (
											<span className="h-5 text-red-500 mt-1 mb-3 block text-sm">
												{errors.price.message}
											</span>
										)}
									</div>
									<div>
										<label>
											Название службы инициатора
											<abbr title="required">*</abbr>
										</label>
										<select
											className={styles.select}
											defaultValue={''}
											{...register('service')}
										>
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
										{errors.service?.message && (
											<span className="h-5 text-red-500 mt-1 mb-3 block text-sm">
												{errors.service.message}
											</span>
										)}
									</div>
									<div>
										<label>
											Тип документа
											<abbr title="required">*</abbr>
										</label>
										<select
											defaultValue={''}
											className={styles.select}
											{...register('type')}
										>
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
										{errors.type?.message && (
											<span className="h-5 text-red-500 mt-1 mb-3 block text-sm">
												{errors.type.message}
											</span>
										)}
									</div>
									<div>
										<label>
											Категория документа
											<abbr title="required">*</abbr>
										</label>
										<select
											defaultValue={''}
											className={styles.select}
											{...register('category')}
										>
											<option value="" disabled>
												Выберите вид
											</option>
											{categoryData?.map((el) => (
												<option
													value={el.id}
													key={el.index}
												>
													{el.name}
												</option>
											))}
										</select>
										{errors.category?.message && (
											<span className="h-5 text-red-500 mt-1 mb-3 block text-sm">
												{errors.category.message}
											</span>
										)}
									</div>
								</div>

								<div className={styles.date}>
									<div className="w-[50%]">
										<label>
											Дата вступления в силу
											<abbr title="required">*</abbr>
										</label>
										<div>
											<input
												type="date"
												placeholder="Select a date"
												{...register('startDate')}
											/>

											{errors.startDate?.message && (
												<span className="h-5 text-red-500 mt-1 mb-3 block text-sm">
													{errors.startDate.message}
												</span>
											)}
										</div>
									</div>
									<div className="w-[50%]">
										<label>
											Дата окончания действия
											<abbr title="required">*</abbr>
										</label>
										<div>
											<input
												type="date"
												placeholder="Select a date"
												{...register('endDate')}
											/>

											{errors.endDate?.message && (
												<span className="h-5 text-red-500 mt-1 mb-3 block text-sm">
													{errors.endDate.message}
												</span>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className={styles.uploadFile}>
								<label className={styles.header}>
									Загрузка документа
								</label>
								{errors.file?.message && (
									<span className="h-5 text-red-500 mt-1 mb-3 block text-sm mr-auto">
										{errors.file.message}
									</span>
								)}
								{!file ? (
									<>
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
												accept="application/pdf"
												{...register('file')}
											/>
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
									</>
								) : (
									<>
										<div className="flex items-center justify-between bg-blue-200 dark:bg-blue-400 rounded-full px-10 py-2">
											<a
												className="file block"
												target="_blank"
												href={`http://${process.env.REACT_APP_BASE_URL}/uploads/${file.url}`}
											>
												{file.name}
											</a>
											<BsFillTrashFill
												size={20}
												className="ml-auto text-gray-500 cursor-pointer hover:text-gray-700 block"
												onClick={() => setFile(null)}
											/>
										</div>
									</>
								)}
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
