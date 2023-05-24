import { IDocument } from './Document.interface';

export interface IDocumentsResponse {
	document: IDocument[];
	pagination: {
		totalCount: number;
		count: number;
		page: number;
	};
}

export interface IDocumentResponse {
	document: IDocument;
	pagination: {
		totalCount: number;
		count: number;
		page: number;
	};
}
