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
