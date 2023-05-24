import { NavLink, useLocation } from 'react-router-dom';

import Logo from '../../assets/img/Logo';
import { useMeQuery } from '../../store/auth/authApi';
import { Permission } from '../../types/permission.enum';
import { Role } from '../../types/role.enum';

import styles from './Sidebar.module.scss';
import { ThemeSwitcher } from './ThemeSwitcher/ThemeSwitcher';
import { menu } from './sidebar.data';

const Sidebar = () => {
	const location = useLocation();
	let items;
	const { data, isLoading, isError } = useMeQuery();
	const admin = menu.filter((items) => items.role === Role.ADMIN);
	const readAdmin = admin.filter(
		(item) => item.permission !== Permission.EDIT
	);
	const service = menu.filter((items) => items.role === Role.SERVICE);
	const superAdmin = menu.filter((items) => items.role === Role.SUPERADMIN);
	if (!isLoading && !isError) {
		if (data?.service.role === 'admin' && data?.service.edit) items = admin;
		if (data?.service.role === 'admin' && !data?.service.edit)
			items = readAdmin;
		if (data?.service.role === 'service') items = service;
		if (data?.service.role === 'superAdmin') items = superAdmin;
	}
	return (
		<aside className={styles.menu}>
			<nav>
				<div className={styles.logo}>
					<Logo color="black" />
				</div>
				<ul>
					{items?.map((item) => (
						<li key={item.name}>
							<NavLink
								to={item.link}
								className={
									location.pathname === item.link
										? styles['active']
										: ''
								}
							>
								<div className={styles.icon}>
									<item.icon />
								</div>
								<p className={styles.item}>{item.name}</p>
							</NavLink>
						</li>
					))}
				</ul>
			</nav>

			<div className={styles.switcher}>
				<ThemeSwitcher />
			</div>
		</aside>
	);
};

export default Sidebar;
