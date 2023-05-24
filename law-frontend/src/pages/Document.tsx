import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Dropdown } from '../components/dropdown/Dropdown';
import ChangeDocument from '../components/forms/changeDocument/ChangeDocument';
import DocumentCard from '../components/table/documentDetail/DocumentCard';
import { BodyLayout } from '../layout/BodyLayout';
import { useGetOneQuery } from '../store/document/documentApi';
import { AdditionalTypeEnum } from '../types/aditionalType.enum';

export const Document = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [type, setType] = useState<AdditionalTypeEnum | null>(null);
	const { id } = useParams();
	const { data, isLoading, isError, isSuccess } = useGetOneQuery(
		id ? id : '1'
	);

	const Terminate = () => {
		setOpen(true);
		setType(AdditionalTypeEnum.TERMINATE);
	};

	const Extend = () => {
		setOpen(true);
		setType(AdditionalTypeEnum.EXTEND);
	};

	const onClose = () => {
		setOpen(false);
		setType(null);
	};

	if (isError || isLoading) {
		return null;
	}
	const document = data?.document;
	console.log(document);
	return (
		<BodyLayout>
			<DocumentCard data={data?.document} />
			<button
				onClick={() => Extend()}
				className="mt-3 px-5 py-2 text-white bg-green-700 cursor-pointer"
			>
				Продлить
			</button>
			<button
				onClick={() => Terminate()}
				className="mt-3 ml-3 px-5 py-2 text-white bg-red-700 cursor-pointer"
			>
				Расторгнуть
			</button>
			<ChangeDocument
				type={type}
				isOpen={open}
				onClose={() => onClose()}
			/>
			{document?.additionalDocuments.length ? (
				<Dropdown additional={data?.document.additionalDocuments} />
			) : null}
		</BodyLayout>
	);
};
