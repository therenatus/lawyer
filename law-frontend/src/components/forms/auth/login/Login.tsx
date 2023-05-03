import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
// import { setCookie } from 'nookies';
import { useDispatch } from 'react-redux';
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';

import { useLoginMutation } from '../../../../store/auth/authApi';

// import { loginFetch } from '../features/user/userSlice';
import styles from './login.module.scss';

export const Login = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm();
	const navigate = useNavigate();
	const [login, { isLoading }] = useLoginMutation();

	const onSubmit = async (data: any) => {
		try {
			const result = await login(data).unwrap();
			Cookies.set('authToken', result.token);
			navigate('/');
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles.body}>
			<div className={styles.blocker}>
				<h1>Вход</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.login}>
						<label htmlFor="email">
							Login
							<abbr title="required"> *</abbr>
						</label>
						<input
							id="email"
							placeholder="СИТиС"
							{...register('shortName')}
						/>
					</div>
					<div className={styles.password}>
						<label htmlFor="password">
							Пароль
							<abbr title="required"> *</abbr>
						</label>
						<div>
							<input
								id="password"
								placeholder="•••••••••"
								{...register('password')}
							/>
						</div>
					</div>
					<button type="submit">Войти</button>
				</form>
				<hr />
				<Link to="/forgot" className={styles.link}>
					Забыл пароль?
				</Link>
			</div>
		</div>
	);
};
