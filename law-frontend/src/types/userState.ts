import { IUser } from './user.interface';

export interface IUserState {
	user: IUser | null;
	loading: boolean;
	error: string | null;
}
