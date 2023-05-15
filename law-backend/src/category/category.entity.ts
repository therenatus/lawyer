import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DocumentEntity } from '@app/document/document.entity';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  index: string;

  @OneToMany(() => DocumentEntity, (document) => document.category)
  document: DocumentEntity;
}
