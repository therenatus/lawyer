import { Role } from './role.enum';

export interface IUser {
	id: string;
	name: string;
	code: string;
	shortName: string;
  role: Role
}

export type TUserEdit = Omit<IUser, 'id'>;

export type TUserCreate = {
	id: string;
	name: string;
	code: string;
	shortName: string;
	password: string;
	role: Role;
};
