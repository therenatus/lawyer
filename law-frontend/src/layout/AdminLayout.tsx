import { Navigate, Outlet } from 'react-router-dom';

import { IUser } from '../types/user.interface';

type Props = {
	edit: boolean;
	admin: IUser;
};

export const AdminLayout = ({ edit, admin }: Props) => {
	return edit === admin.edit ? <Outlet /> : <Navigate to={'/forbidden'} />;
};
