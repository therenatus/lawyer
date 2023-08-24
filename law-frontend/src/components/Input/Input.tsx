import React from 'react';
import { UseFormRegister, useForm } from 'react-hook-form';

type InputProps = {
	name: string;
	label: string;
	register: UseFormRegister<any>;
	placeholder: string;
	required?: boolean;
};

export const Input: React.FC<InputProps> = ({
	name,
	label,
	required,
	register,
	placeholder,
	...rest
}) => {
	const {
		formState: { errors }
	} = useForm();
	return (
		<>
			<label>{label}</label>
			<input
				id={name}
				{...register(name, { required })}
				{...rest}
				placeholder={placeholder}
			/>
			{console.log(errors)}
			{errors[name] && <span>This field is required</span>}
		</>
	);
};
