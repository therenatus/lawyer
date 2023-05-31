import { Status } from './types/status.type';
import { ServiceEntity } from '../service/service.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from '../category/category.entity';
import { AdditionalEntity } from '../additional/additional.entity';

@Entity({ name: 'documents' })
export class DocumentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number: string;

  @Column()
  title: string;

  @Column()
  contrAgent: string;

  @Column('simple-array')
  tagList: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  endDate: Date;

  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // startDate: Date;

  @Column({ type: 'enum', enum: Status, default: Status.TODO })
  status: Status;

  @Column({ default: null, nullable: true })
  fileName: string;

  @Column({ default: null, nullable: true })
  filePath: string;

  @Column()
  price: string;

  @ManyToOne(() => ServiceEntity, (service) => service.documents, {
    eager: true,
  })
  author: ServiceEntity;

  @ManyToOne(() => ServiceEntity, (service) => service.initiator, {
    eager: true,
  })
  initiators: ServiceEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.id)
  category: CategoryEntity;

  @OneToMany(() => AdditionalEntity, (additional) => additional.addiction, {
    nullable: true,
  })
  additionalDocuments: AdditionalEntity[];

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
