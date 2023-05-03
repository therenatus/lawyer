import { IUser } from './user.interface';

export interface IDocument {
	id: string;
	number: string;
	title: string;
	contrAgent: string;
	tagList: string[];
	createdAt: string;
	updatedAt: string;
	endDate: string;
	status: string;
	fileName?: string;
	filePath?: string;
	author: IUser;
	initiators: IUser;
}
