import { IDocument } from './Document.interface';

export interface IDocumentResponse {
	document: IDocument[];
	totalCount: number;
}
