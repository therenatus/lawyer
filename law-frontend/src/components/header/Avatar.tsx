import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';

import { useMeQuery } from '../../store/auth/authApi';

import styles from './avatatr.module.scss';

export const Avatar = () => {
	const navigate = useNavigate();
	// const { data } = useSelector((state) => state.auth);
	const { data } = useMeQuery();
	const [open, setOpen] = useState(false);

	const onHandleLogout = async () => {
		if (window.confirm('Вы действительно хотите выйти?')) {
			Cookies.remove('authToken');
			// dispatch(logout());
			navigate('/tenders');
			window.location.reload();
		}
	};

	return (
		<div className={styles.body}>
			<div className={styles.loged} onClick={() => setOpen(!open)}>
				<p>{data?.service.name}</p>
				<button type="button" aria-label="avatar">
					<IoPersonCircleOutline />
				</button>
			</div>

			{open && (
				<div className={styles.menu}>
					<div className={styles.menu_img}>
						<IoPersonCircleOutline />

						<div>{data?.service.name}</div>
					</div>

					<div className={styles.password}>
						<Link to="/change-password">Изменить пароль</Link>
					</div>
					<div className={styles.logout}>
						<button onClick={onHandleLogout}>
							<svg
								className="h-4 w-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
								></path>
							</svg>
							<div>ВЫЙТИ</div>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
