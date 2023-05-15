import { Route, Routes } from 'react-router-dom';

import { Loader } from '../components/Loader';
import CreateService from '../components/forms/auth/createService/CreateService';
import { Login } from '../components/forms/auth/login/Login';
import { ChangePassword } from '../components/forms/chagePassword/ChangePassword';
import CreateDocument from '../components/forms/createDocument/CreateDocument';
import DocumentCard from '../components/table/documentDetail/DocumentCard';
import ServiceList from '../components/table/serviceList/ServiceList';
import { AdminLayout } from '../layout/AdminLayout';
import AuthLayout from '../layout/AuthLayout';
import MainLayout from '../layout/MainLayout';
import { NotFound } from '../pages/404';
import { AllDocuments } from '../pages/AllDocuments';
import { Document } from '../pages/Document';
import { ErrorPage } from '../pages/Error';
import { ExpiresDocuments } from '../pages/ExpiresDocuments';
import { Forbidden } from '../pages/Forbidden';
import { MyDocuments } from '../pages/MyDocuments';
import { useMeQuery } from '../store/auth/authApi';
import { Role } from '../types/role.enum';

const App = () => {
	const { data, isLoading, isError } = useMeQuery();
	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<Routes>
				{isError && <Route path="/" element={<Login />} />}
				<Route path="/login" element={<Login />} />
				<Route path="/error" element={<ErrorPage />} />
				<Route path="/forbidden" element={<Forbidden />} />
				<Route path="/" element={<MainLayout />}>
					{data?.service.role === 'service' ? (
						<Route
							element={<AuthLayout allowRole={Role.SERVICE} />}
						>
							<Route path="/" element={<MyDocuments />} />
							<Route path=":id" element={<DocumentCard />} />
						</Route>
					) : null}
					{data?.service.role === 'admin' ? (
						<Route element={<AuthLayout allowRole={Role.ADMIN} />}>
							<Route
								element={
									<AdminLayout edit admin={data?.service} />
								}
							>
								<Route
									path="add-file"
									element={<CreateDocument />}
								/>
							</Route>
							<Route index element={<AllDocuments />} />
							<Route path=":id" element={<Document />} />
							<Route
								path="/expires"
								element={<ExpiresDocuments />}
							/>

							<Route
								path="/change-password"
								element={<ChangePassword />}
							/>
						</Route>
					) : null}

					<Route element={<AuthLayout allowRole={Role.SUPERADMIN} />}>
						<Route
							path="/add-service"
							element={<CreateService />}
						/>
						<Route path="service-list" element={<ServiceList />} />
					</Route>
				</Route>
				<Route path={'/load'} element={<Loader />} />
				<Route path={'/forbidden'} element={<Forbidden />} />
				<Route path={'/*'} element={<NotFound />} />
			</Routes>
		</>
	);
};

export default App;
