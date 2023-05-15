import { IconType } from 'react-icons';
import { FaUserEdit } from 'react-icons/fa';
import {
	RiFile3Line,
	RiFileAddLine,
	RiFileWarningLine,
	RiUserAddFill
} from 'react-icons/ri';

import { Permission } from '../../types/permission.enum';
import { Role } from '../../types/role.enum';

export interface IMenuItem {
	name: string;
	link: string;
	icon: IconType;
	role: Role;
	permission?: Permission;
}

export const menu: IMenuItem[] = [
	{
		name: 'Документы',
		link: '/',
		icon: RiFile3Line,
		role: Role.ADMIN
	},
	{
		name: 'Мои Документы',
		link: '/',
		icon: RiFile3Line,
		role: Role.SERVICE
	},
	{
		name: 'Истекающие',
		link: '/expires',
		icon: RiFileWarningLine,
		role: Role.ADMIN
	},
	{
		name: 'Добавить документ',
		link: '/add-file',
		icon: RiFileAddLine,
		role: Role.ADMIN,
		permission: Permission.EDIT
	},
	{
		name: 'Добавить службу',
		link: '/add-service',
		icon: RiUserAddFill,
		role: Role.SUPERADMIN
	},
	{
		name: 'Редактировать службу',
		link: '/service-list',
		icon: FaUserEdit,
		role: Role.SUPERADMIN
	}
];

// export const menu: IMenuItem[] = [
// 	{
// 		name: 'Главня',
// 		link: '/',
// 		icon: RiHome2Line,
// 		roles: ['ADMIN', 'USER']
// 	},
// 	{
// 		name: 'Новости',
// 		link: '/news',
// 		icon: RiNewspaperLine,
// 		roles: ['ADMIN', 'USER']
// 	},
// 	{
// 		name: 'Справочник',
// 		link: '/contact',
// 		icon: RiContactsBookLine,
// 		roles: ['ADMIN', 'USER']
// 	},
// 	{
// 		name: 'Руководство',
// 		link: '/team',
// 		icon: RiTeamLine,
// 		roles: ['ADMIN', 'USER']
// 	},
// 	{
// 		name: 'Документы',
// 		link: '/files',
// 		icon: RiFile2Line,
// 		roles: ['ADMIN', 'USER']
// 	},
// 	{
// 		name: 'Редактирование сотрудников',
// 		link: '/contacts',
// 		icon: RiFile2Line,
// 		roles: ['ADMIN']
// 	},
// 	{
// 		name: 'Редактирование служб',
// 		link: 'addService',
// 		icon: RiFile2Line,
// 		roles: ['ADMIN']
// 	}
// ];
