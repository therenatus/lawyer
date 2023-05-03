import { DocumentEntity } from './../document.entity';

export type DocumentType = Omit<DocumentEntity, 'updateTimestamp'>;
