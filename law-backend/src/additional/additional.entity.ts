import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DocumentEntity } from '../document/document.entity';
import { AdditionalTypeEnum } from '../types/AdditionalType.enum';

@Entity()
export class AdditionalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: null, nullable: true })
  filePath: string;

  @Column({ default: null, nullable: true })
  fileName: string;

  @Column({ type: 'enum', enum: AdditionalTypeEnum })
  type: AdditionalTypeEnum;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => DocumentEntity, (document) => document.additionalDocuments)
  addiction: DocumentEntity;
}
