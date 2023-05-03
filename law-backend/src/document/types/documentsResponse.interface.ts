import { DocumentType } from './document.type';
export interface IDocumentsResponse {
  document: DocumentType[];
  totalCount: number;
}
