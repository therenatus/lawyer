import React from 'react';
import { useForm } from 'react-hook-form';

import { useChangePasswordMutation } from '../../../store/auth/authApi';

import styles from './change-password.module.scss';

type Props = {};

export const ChangePassword = (props: Props) => {
	const [change, { isLoading, isError }] = useChangePasswordMutation();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();

	const onSubmit = (e: any) => {
		change(e);
	};
	return (
		<div className={styles.body}>
			<div className={styles.blocker}>
				<h1>Сменить пароль</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.login}>
						<label htmlFor="email">
							Старый пароль
							<abbr title="required"> *</abbr>
						</label>
						<input
							placeholder="•••••••••"
							{...register('oldPassword')}
						/>
					</div>
					<div className={styles.password}>
						<label htmlFor="password">
							Новый пароль
							<abbr title="required"> *</abbr>
						</label>
						<div>
							<input
								id="password"
								placeholder="•••••••••"
								{...register('newPassword')}
							/>
						</div>
					</div>

					<div className={styles.password}>
						<label htmlFor="password">
							Потвердите пароль
							<abbr title="required"> *</abbr>
						</label>
						<div>
							<input
								id="password"
								placeholder="•••••••••"
								{...register('confirmPassword')}
							/>
						</div>
					</div>
					<button type="submit">Потвердить</button>
				</form>
			</div>
		</div>
	);
};
