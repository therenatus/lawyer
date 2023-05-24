import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsXLg } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

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
	const [file, setFile] = useState<IFile[]>([]);
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch
	} = useForm();

	const upload: FileList = watch('file');

	useEffect(() => {
		const formData = new FormData();
		if (upload && upload[0] != undefined) {
			formData.append('files', upload[0]);
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
	}, [upload]);

	const onHandleSubmit = async (e: any) => {
		e.file = file[0];
		e.type = type;
		const data = await axios.post(
			`${process.env.REACT_APP_BASE_URL}/additional/${param.id}`,
			e
		);

		console.log(data);
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
