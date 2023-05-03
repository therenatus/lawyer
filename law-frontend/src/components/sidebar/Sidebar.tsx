import { NavLink, useLocation } from 'react-router-dom';

import Logo from '../../assets/img/Logo';

import styles from './Sidebar.module.scss';
import { ThemeSwitcher } from './ThemeSwitcher/ThemeSwitcher';
import { menu } from './sidebar.data';
import {useMeQuery} from "../../store/auth/authApi";
import {Role} from "../../types/role.enum";

type Props = {};

const Sidebar = (props: Props) => {
	const location = useLocation();
  let items;
  const {data, isLoading, isError} = useMeQuery();
  if(!isLoading && !isError) {
    const admin = menu.filter(items => items.role === Role.ADMIN);
    const service = menu.filter(items => items.role === Role.SERVICE);
    const superAdmin = menu.filter(items => items.role === Role.SUPERADMIN);
    if(data?.service.role === 'admin') items = admin;
    if(data?.service.role === 'service') items = service;
    if(data?.service.role === 'superAdmin') items = superAdmin;
  }
	return (
		<aside className={styles.menu}>
			<nav>
        <>{console.log(items)}</>
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
