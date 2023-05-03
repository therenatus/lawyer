import { Status, TStatus } from './types/status.type';
import { ServiceEntity } from '../service/service.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column({ type: 'enum', enum: Status, default: Status.TODO })
  status: Status;

  @Column({ default: null, nullable: true })
  fileName: string;

  @Column({ default: null, nullable: true })
  filePath: string;

  @ManyToOne(() => ServiceEntity, (service) => service.documents, {
    eager: true,
  })
  author: ServiceEntity;

  @ManyToOne(() => ServiceEntity, (service) => service.initiator, {
    eager: true,
  })
  initiators: string;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
