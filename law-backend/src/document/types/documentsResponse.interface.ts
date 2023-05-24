import { DocumentType } from './document.type';
export interface IDocumentsResponse {
  document: DocumentType[];
  pagination: {
    totalCount: number;
    page: number;
    count: number;
  };
}
