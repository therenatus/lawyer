import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useRegisterMutation } from '../../../../store/auth/authApi';
import { Role } from '../../../../types/role.enum';
import { TUserCreate } from '../../../../types/user.interface';

import styles from './create-service.module.scss';

type Props = {};

const CreateService: React.FC = ({}: Props) => {
	const [create, { isLoading, isSuccess, isError }] = useRegisterMutation();
	const schema = yup.object().shape({
		name: yup.string().required('Поле не должно быть пустым'),
		code: yup.string().required('Поле не должно быть пустым'),
		shortName: yup.string().required('Поле не должно быть пустым')
	});
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<TUserCreate>({
		resolver: yupResolver(schema)
	});

	const onSubmit = (e: TUserCreate) => {
		e.password = '12345678';
		e.role = Role.SERVICE;
		create(e);
	};

	return (
		<div className={styles.body}>
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
					</div>
					<button type="submit">Добавить</button>
				</form>
			</div>
		</div>
	);
};
export default CreateService;
