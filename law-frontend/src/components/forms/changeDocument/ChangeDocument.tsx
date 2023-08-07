import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsFillTrashFill, BsXLg } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AdditionalTypeEnum } from '../../../types/aditionalType.enum';
import styles from '../createDocument/document.module.scss';

interface LoginModalProps {
	isOpen: boolean;
	onClose: () => void;
	type: AdditionalTypeEnum | null;
}

interface IFile {
	url: string;
	path: string;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, type }) => {
	const param = useParams();

	const [file, setFile] = useState<IFile | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch
	} = useForm();

	const toUpload: FileList = watch('file');

	const fileUpload = async () => {
		if (toUpload && toUpload[0] !== undefined) {
			const formData = new FormData();
			formData.append('files', toUpload[0]);
			const res = axios.post(
				`${process.env.REACT_APP_BASE_URL}/file/upload`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data, charset=utf-8'
					},
					responseEncoding: 'utf-8'
				}
			);
			toast
				.promise(res, {
					pending: 'Загрузка файла',
					success: { render: 'Файл успешно загружен', delay: 100 },
					error: {
						render: 'Произола ощибка при загрузке файла',
						delay: 100
					}
				})
				.then((res) => setFile(res.data));
		}
	};

	useEffect(() => {
		fileUpload();
	}, [toUpload]);

	const onHandleSubmit = async (e: any) => {
		e.file = file;
		e.type = type;
		const data = await axios.post(
			`${process.env.REACT_APP_BASE_URL}/additional/${param.id}`,
			e
		);
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center w-full h-full z-40 bg-opacity-70 bg-gray-900">
			<div className="bg-white dark:bg-dark rounded-lg p-6 pt-12 drop-shadow-2xl relative">
				<button
					onClick={onClose}
					className="absolute right-2 top-2 px-5 py-2 text-white cursor-pointer"
				>
					<BsXLg />
				</button>
				<form onSubmit={handleSubmit(onHandleSubmit)}>
					{AdditionalTypeEnum.EXTEND === type ? (
						<input
							{...register('endDate', {
								required: 'Not Empty'
							})}
							type="date"
							className="appearance-none block w-full bg-gray-200 text-gray-800 dark:text-gray-300 border border-gray-300 rounded-lg h-10 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
						/>
					) : null}
					<div className={styles.uploadFile}>
						<label className={styles.header}>Загрузка файла</label>
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
							{errors.file?.message && <>{errors.file.message}</>}
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
					{file ? (
						<div className="flex items-center justify-between bg-blue-200 dark:bg-blue-400 rounded-full px-10 py-2 h">
							<a
								className="file block"
								target="_blank"
								href={`http://${process.env.REACT_APP_BASE_URL}/uploads/${file.url}`}
							>
								{file.url}
							</a>
							<BsFillTrashFill
								size={20}
								className="ml-auto text-gray-500 cursor-pointer hover:text-gray-700 block"
								onClick={() => setFile(null)}
							/>
						</div>
					) : null}
					<button
						type="submit"
						className="dark:bg-blue-700 px-5 py-2 text-white"
					>
						Сохранить
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginModal;
