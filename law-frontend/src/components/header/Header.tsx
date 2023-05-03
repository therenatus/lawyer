import { useState } from 'react';
import { MdOutlineAccountCircle } from 'react-icons/md';

import { useMeQuery } from '../../store/auth/authApi';

import { Avatar } from './Avatar';
import styles from './Header.module.scss';

const Header = () => {
	const { data, isLoading } = useMeQuery();

	if (isLoading) {
		return <p>LOADING...</p>;
	}
	return (
		<header>
			<div className={styles.account}>
				{/* <p>{data?.service.shortName}</p> */}
				{/* {data ? <MdOutlineAccountCircle /> : <MdOutlineAccountCircle />} */}
				<Avatar />
			</div>
		</header>
	);
};

export default Header;
