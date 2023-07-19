import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { BodyLayout } from '../layout/BodyLayout';
import { useRegisterMutation } from '../store/auth/authApi';
import { Role } from '../types/role.enum';
import { TUserCreate } from '../types/user.interface';

const CreateService = () => {
	// @ts-ignore
	return (
		<BodyLayout>
			<CreateService />
		</BodyLayout>
	);
};
export default CreateService;
