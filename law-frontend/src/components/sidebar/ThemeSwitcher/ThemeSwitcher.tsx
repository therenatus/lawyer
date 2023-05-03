import { useEffect } from 'react';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../store/store';
import { set } from '../../../store/theme/themeSlice';

import styles from './ThemeSwitcher.module.scss';

type Props = {};

export const ThemeSwitcher = (props: Props) => {
	const theme = useSelector((state: RootState) => state.theme);
	const dispatch = useDispatch();

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
		if (theme === 'dark') {
			document.documentElement.classList.remove('light');
			document.documentElement.classList.add(theme);
		}
		if (theme === 'light') {
			document.documentElement.classList.remove('dark');
			document.documentElement.classList.add(theme);
		}
		localStorage.setItem('theme', theme);
	}, [theme]);

	const handleChangeTheme = () => {
		const setTheme = theme === 'dark' ? 'light' : 'dark';
		dispatch(set(setTheme));
	};

	return (
		<button onClick={() => handleChangeTheme()}>
			{theme === 'dark' ? (
				<RiSunFill size={25} color="yellow" />
			) : (
				<RiMoonFill size={25} color="#0F044C" />
			)}
		</button>
	);
};
