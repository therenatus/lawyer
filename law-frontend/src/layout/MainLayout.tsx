import { Outlet } from 'react-router-dom';

import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';

import styles from './MainLayout.module.scss';

const MainLayout = () => {
	return (
		<div className={styles.main}>
			<Sidebar />
			<div className={styles.content}>
				<Header />
				<div className={styles.body}>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default MainLayout;
