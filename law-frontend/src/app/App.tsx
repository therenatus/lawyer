import { Route, Routes } from 'react-router-dom';

import CreateService from '../components/forms/auth/createService/CreateService';
import { Login } from '../components/forms/auth/login/Login';
import { ChangePassword } from '../components/forms/chagePassword/ChangePassword';
import CreateDocument from '../components/forms/createDocument/CreateDocument';
import DocumentCard from '../components/table/documentDetail/DocumentCard';
import ServiceList from '../components/table/serviceList/ServiceList';
import AuthLayout from '../layout/AuthLayout';
import MainLayout from '../layout/MainLayout';
import { AllDocuments } from '../pages/AllDocuments';
import { ErrorPage } from '../pages/Error';
import { ExpiresDocuments } from '../pages/ExpiresDocuments';
import { MyDocuments } from '../pages/MyDocuments';
import { Role } from '../types/role.enum';

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route element={<AuthLayout allowRole={Role.ADMIN} />}>
						<Route index element={<AllDocuments />} />
						<Route path="/expires" element={<ExpiresDocuments />} />
						<Route path=":id" element={<DocumentCard />} />
						<Route path="add-file" element={<CreateDocument />} />
						<Route
							path="/change-password"
							element={<ChangePassword />}
						/>
					</Route>
					<Route element={<AuthLayout allowRole={Role.SERVICE} />}>
						<Route path="/my-doc" element={<MyDocuments />} />
					</Route>
					<Route element={<AuthLayout allowRole={Role.SUPERADMIN} />}>
						<Route
							path="/add-service"
							element={<CreateService />}
						/>
						<Route path="service-list" element={<ServiceList />} />
					</Route>
				</Route>
				<Route path="/login" element={<Login />} />
				<Route path="error" element={<ErrorPage />} />
			</Routes>
		</>
	);
};

export default App;
