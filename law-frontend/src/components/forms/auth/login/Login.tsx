import { yupResolver } from '@hookform/resolvers/yup';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { useLoginMutation } from '../../../../store/auth/authApi';

import styles from './login.module.scss';

interface IInput {
	shortName: string;
	password: string;
}
export const Login = () => {
	const [visible, setVisible] = useState(false);

	const schema = yup.object().shape({
		shortName: yup
			.string()
			.required('Обьязательное поле')
			.min(3, 'Логин должен содержать не менее 3 символов')
			.max(6, 'Логин должен содержать не более 6 символов'),

		password: yup
			.string()
			.required('Обьязательное поле')
			.min(8, 'Пароль должен содержать не менее 8 символов')
			.max(16, 'Пароль должен содержать не более 16 символов')
	});
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<IInput>({ resolver: yupResolver(schema) });
	const navigate = useNavigate();
	const [login, { isLoading, isError, error }] = useLoginMutation();

	const onSubmit = async (data: any) => {
		const result = await login(data).unwrap();
		Cookies.set('authToken', result.token);
		window.location.reload();
	};

	return (
		<div className={styles.body}>
			<div className={styles.blocker}>
				<h1>Вход</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					{isError ? (
						<p className="text-center text-red-700">
							{getErrorData(error)}
						</p>
					) : null}
					<div className={styles.login}>
						<label htmlFor="email">
							Логин
							<abbr title="required"> *</abbr>
						</label>
						<input
							id="email"
							placeholder="СИТиС"
							{...register('shortName')}
						/>
						{errors.shortName && (
							<span className="h-5 text-red-500 mt-1 mb-3 block">
								{errors.shortName.message}
							</span>
						)}
					</div>
					<div className={styles.password}>
						<label htmlFor="password">
							Пароль
							<abbr title="required"> *</abbr>
						</label>
						<div>
							<div
								className="absolute top-3 right-5 cursor-pointer"
								onClick={() => setVisible(!visible)}
							>
								{visible ? <BsEyeSlashFill /> : <BsEyeFill />}
							</div>
							<input
								id="password"
								placeholder="•••••••••"
								type={visible ? 'text' : 'password'}
								{...register('password')}
							/>
							{errors.password && (
								<span className="h-5 text-red-500 mt-1 mb-3 block">
									{errors.password.message}
								</span>
							)}
						</div>
					</div>
					<button type="submit">Войти</button>
				</form>
				<hr />
			</div>
		</div>
	);
};

function getErrorData(error: any) {
	if (error && 'data' in error) {
		return error.data.message;
	} else {
		return 'An error occurred.';
	}
}
