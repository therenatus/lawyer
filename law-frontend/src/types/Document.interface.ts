import { AdditionalTypeEnum } from './aditionalType.enum';
import { IUser } from './user.interface';

export interface IDocument {
	id: string;
	number: string;
	title: string;
	price: string;
	contrAgent: string;
	tagList: string[];
	createdAt: string;
	updatedAt: string;
	endDate: string;
	status: string;
	fileName?: string;
	filePath?: string;
	category: ICategory;
	author: IUser;
	initiators: IUser;
	additionalDocuments: Additional[];
}

export interface Additional {
	title: string;
	filePath?: string;
	fileName?: string;
	addiction: IDocument;
	createdAt?: string;
	type: AdditionalTypeEnum;
}

export interface ICategory {
	id: string;
	name: string;
	index: string;
}
