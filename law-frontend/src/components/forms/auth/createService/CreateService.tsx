import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useRegisterMutation } from '../../../../store/auth/authApi';
import { Role } from '../../../../types/role.enum';
import { TUserCreate } from '../../../../types/user.interface';

import styles from './create-service.module.scss';

const CreateService: React.FC = () => {
	const [create, { isLoading, isSuccess, isError, error }] =
		useRegisterMutation();
	const [role, setRole] = useState();
	const schema = yup.object().shape({
		name: yup.string().required('Поле не должно быть пустым'),
		code: yup.string().required('Поле не должно быть пустым'),
		shortName: yup.string().required('Поле не должно быть пустым'),
		role: yup.string().required('Поле не должно быть пустым')
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch
	} = useForm<TUserCreate>({
		resolver: yupResolver(schema)
	});

	const set = watch('role');

	const onSubmit = (e: TUserCreate) => {
		e.password = '12345678';
		if (e.role === Role.SERVICE) {
			e.permission = 'READ';
		}
		create(e);
	};

	// @ts-ignore
	return (
		<div className={styles.body}>
			<>{isError && console.log(error)}</>
			<div>
				<h1>Добавить службу</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<div>
							<label>
								Инициалы службы
								<abbr title="required">*</abbr>
							</label>
							<input
								placeholder="Инициалы службы"
								type="text"
								{...register('shortName')}
							/>

							{errors.shortName && errors.shortName.message && (
								<>
									<p>{errors.shortName.message}</p>
								</>
							)}
						</div>
						<div>
							<label>
								Код службы
								<abbr title="required">*</abbr>
							</label>
							<input
								placeholder="Код службы"
								type="text"
								{...register('code')}
							/>

							{errors.code && errors.code.message && (
								<>
									<p>{errors.code.message}</p>
								</>
							)}
						</div>
						<div className={styles.name}>
							<label>
								Название службы
								<abbr title="required">*</abbr>
							</label>
							<input
								placeholder="Название службы"
								type="text"
								{...register('name')}
							/>

							{errors.name && errors.name.message && (
								<>
									<p>{errors.name.message}</p>
								</>
							)}
						</div>
						<div>
							<label>Роль</label>
							<select
								className={styles.select}
								defaultValue={''}
								{...register('role')}
							>
								<option value="" disabled>
									Выберите вид
								</option>
								<option value={Role.ADMIN}>Админ</option>
								<option value={Role.SERVICE}>Сервис</option>
							</select>
						</div>
						{set === Role.ADMIN ? (
							<div>
								<label>Права</label>
								<select
									className={styles.select}
									defaultValue={''}
									{...register('permission', {
										required: true
									})}
								>
									<option value="" disabled>
										Выберите уровень доступа
									</option>
									<option value={'READ'}>Чтение</option>
									<option value={'EDIT'}>
										Редактирование
									</option>
								</select>
							</div>
						) : null}
					</div>
					<button type="submit">Добавить</button>
				</form>
			</div>
		</div>
	);
};
export default CreateService;
